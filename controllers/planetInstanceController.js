const PlanetInstance = require("../models/planetInstance");

// Display list of all PlanetInstances
exports.planet_instances = (req, res, next) => {
    PlanetInstance.find({})
        .exec( (err, list_planet_instances) => {
            if (err) return next(err)
            res.render("planet_instances_list", { title: "All Planet Instances",  list_planet_instances: list_planet_instances})
        })
}

// Display detail page for a specific PlanetInstance
exports.planet_instance_details = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Planet Instance: " + req.params.id)
}

// Populate form with planets details, not as input fields though. As text fields
// Then send the form with the user allowed content.

// Display PlanetInstance create form on GET
exports.planet_instance_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Planet Instance create GET')
}

// Handle BookInstance create on POST
exports.planet_instance_create_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Planet Instance create POST')
}
