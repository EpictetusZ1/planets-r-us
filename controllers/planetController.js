const Planet = require("../models/planet");

// Display list of all Planets
exports.planets = (req, res) => {
    res.send("NOT IMPLEMENTED: Planet list")
}

// Display detail page for a specific planet
exports.planet_details = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Planet detail: " + req.params.id)
}
