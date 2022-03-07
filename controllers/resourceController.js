const Resource = require("../models/resource");

// Display list of all Resources
exports.resources = (req, res, next) => {
    Resource.find({})
        .exec( (err, list_resources) => {
            if (err) return next(err)
            res.render("resources_list", { title: "All Resources",  list_resources: list_resources})
        })
}

// Display detail page for a specific Resource
exports.resource_details = (req, res) =>  {
    res.send("NOT IMPLEMENTED: Resource Details: " + req.params.id)
}
