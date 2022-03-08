const express = require("express");
const router = express.Router();

const galaxyController = require("../controllers/galaxyController")
const planetController = require("../controllers/planetController")
const planetInstanceController = require("../controllers/planetInstanceController")
const resourceController = require("../controllers/resourceController")


/// GALAXY ROUTES ///

// GET planetary registry home page
router.get("/", galaxyController.index)

// GET request for one Galaxy
router.get("/galaxy/:id", galaxyController.galaxy_detail)

// GET request for list of all Galaxy items
router.get('/galaxies', galaxyController.galaxy_list)


/// PLANET ROUTES ///

// GET request for one Planet
router.get("/planets/:id", planetController.planet_details)

// GET request for list of all Planets
router.get("/planets", planetController.planets)


/// PLANET INSTANCE ROUTES ///

// GET request for one list of all Planet Instances
router.get("/planetinstances", planetInstanceController.planet_instances)

// GET request for one Planet Instance
router.get("/planetinstances/:id", planetInstanceController.planet_instance_details)

// GET request to update Planet Instance
router.get("/planetinstances/:id/update", planetInstanceController.planet_instance_create_get)

// POST request to update Planet Instance
router.post('/planetinstances/:id/update', planetInstanceController.planet_instance_create_post)


/// RESOURCE ROUTES ///

// GET request for one Resource
router.get("/resources/:id", resourceController.resource_details)

// GET request for list of all resources
router.get("/resources", resourceController.resources)

module.exports = router;

