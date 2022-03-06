const Galaxy = require("../models/galaxy");

exports.index = (req, res) => {
    res.send("NOT IMPLEMENTED: Site Home Page")
}

// Display list of all galaxies
exports.galaxy_list = (req, res) => {
    res.send("NOT IMPLEMENTED: Galaxy list")
}

// Display detail page with associated planets for a specific galaxy
exports.galaxy_detail = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Galaxy detail: " + req.params.id)
}
