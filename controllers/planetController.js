const Planet = require("../models/planet");

// Display list of all Planets
exports.planets = (req, res, next) => {
    Planet.find({})
        .exec( (err, list_planets) => {
            if (err) return next(err)
            res.render("planets_list", { title: "Types of Planets",  list_planets: list_planets})
        })
}

// Display detail page for a specific planet
exports.planet_details = (req, res, next) =>  {
    Planet.findById(req.params.id)
        .exec( (err, planet_detail) => {
            if (err) return next(err)
            res.render("planet_type_detail", { title: "Planet Type",  planet: planet_detail})
        })
}
