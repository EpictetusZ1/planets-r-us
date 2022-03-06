const Resource = require("../models/resource");

// Display list of all Resources
exports.resources = (req, res) => {
    res.send("NOT IMPLEMENTED: Resources list")
}

// Display detail page for a specific Resource
exports.resource_details = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Resource Details: " + req.params.id)
}
