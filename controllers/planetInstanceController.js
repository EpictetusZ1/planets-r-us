const { body, validationResult } = require('express-validator');
const PlanetInstance = require("../models/planetInstance");
const Galaxy = require("../models/galaxy");
const async = require("async");
const Planet = require("../models/planet");
const PlanetInstances = require("../models/planetInstance");
const Resources = require("../models/resource");

// Display list of all PlanetInstances
exports.planet_instances = (req, res, next) => {
    PlanetInstance.find({})
        .populate("planet")
        .exec( (err, list_planet_instances) => {
            if (err) return next(err)
            res.render("planet_instances_list", { title: "All Planet Instances",  list_planet_instances: list_planet_instances})
        })
}

// Display detail page for a specific PlanetInstance
exports.planet_instance_details = (req, res) =>  {
    PlanetInstance.findById(req.params.id)
        .populate("planet")
        .exec( (err, planet_info) => {
            if (err) return next(err)
            res.render("planet_instance_detail", { title: "Planet Instance Details",  planet_info: planet_info})
        })
}


// Display PlanetInstance create form on GET
exports.planet_instance_create_get = (req, res, next) => {
    async.parallel({
        planet_data: (cb) => {
            PlanetInstance.findById(req.params.id)
                .populate("planet")
                .exec(cb)
        },
        resource_list: (cb) => {
            Resources.find({})
                .exec(cb)
        }
    }, (err, results) => {
        res.render("planet_instance_form", { title: "Claim your Planet!", error: err, planet_info: results.planet_data, resource_data: results.resource_list })
    })
}

// Handle PlanetInstance create on POST

exports.planet_instance_create_post = [
    body("name", "Planet Name must not be empty.").trim().isLength({min: 1}).escape(),
    body("resources"),
    body("reqResources").trim().escape().custom((value, { req }) => {
        if (value !== req.body.resources) {
            throw new Error("The selected Resource does not match the required resource.")
        }
        return true
    }),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            // Get planet ID out of url -31 includes the length of the '/create' url path
            const parseID = req.url.slice(-31, req.url.lastIndexOf("/"))

            // There are errors. Render the form again with  error messages
            return async.parallel({
                planet_data: (cb) => {
                    PlanetInstance.findById(parseID)
                        .populate("planet")
                        .exec(cb)
                },
                resource_list: (cb) => {
                    Resources.find({})
                        .exec(cb)
                }
            }, (err, results) => {
                res.render("planet_instance_form", { title: "Claim your Planet!", errors: errors.array(), planet_info: results.planet_data, resource_data: results.resource_list })
            })

        } else {
            const updateTarget = async() => {
                const target = await PlanetInstance.findById(req.params.id).exec()

                target.name = req.body.name
                target.resources = [req.body.resources]
                target.owned = true

                target.save( function (err) {
                    if (err) return next(err)
                    return res.redirect(target.url)
                })
            }
            updateTarget()
        }
    }
]
