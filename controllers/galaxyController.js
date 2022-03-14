const Galaxy = require("../models/galaxy");
const Planet = require("../models/planet");
const PlanetInstances = require("../models/planetInstance");
const Resources = require("../models/resource");
const async = require("async");


exports.index = (req, res) => {
    async.parallel({
        galaxy_count: (cb) => {
            Galaxy.countDocuments({}, cb)
        },
        planet_type_count: (cb) => {
            Planet.countDocuments({}, cb)
        },
        planet_instance_count: (cb) => {
            PlanetInstances.countDocuments({}, cb)
        },
        resources_count: (cb) => {
            Resources.countDocuments({}, cb)
        }
    }, (err, results) => {
        res.render("index", { title: "Planets-r-Us", error: err, data: results })
    })
}

// Display list of all galaxies
exports.galaxy_list = (req, res, next) => {
    Galaxy.find({})
        .exec((err, list_galaxies) => {
            if (err) return next(err)
            res.render("galaxies_list", { title: "All Galaxies",  list_galaxies: list_galaxies})
        })
}

// Display detail page with associated planets for a specific galaxy
exports.galaxy_detail = (req, res, next) =>  {
    async.parallel({
        galaxy: (cb) => {
            Galaxy.findById(req.params.id)
                .exec(cb)
        },

        galaxy_planet_types: (cb) => {
            Planet.find({ "galaxy": req.params.id })
                .exec(cb)
        },
        galaxy_planet_instances: (cb) => {
            PlanetInstances.find({})
                .populate({
                    path: "planet",
                    populate: {
                        path: "galaxy",
                    }
                })
                .exec(cb)
        },
    }, (err, results) => {
        if (err)  return next(err)
        if (results.galaxy === null) { // No results.
            const err = new Error("Galaxy not found.")
            err.status = 404
            return next(err)
        }
        const filterResults = () => {
            let finalResults = []
            for (let i = 0; i < results.galaxy_planet_instances.length; i++) {
                if (results.galaxy_planet_instances[i].planet.galaxy.id === req.params.id) {
                    finalResults.push(results.galaxy_planet_instances[i])
                }
            }
            return finalResults
        }

        res.render("galaxy_detail", { title: "Galaxy Details", galaxy: results.galaxy, galaxy_planet_types: filterResults()} )
    })
}
