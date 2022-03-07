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
exports.galaxy_detail = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Galaxy detail: " + req.params.id)
}
