#! /usr/bin/env node


// This script is from the MDN 'LocalLibrary' tutorial, modified for use here.

const userArgs = process.argv.slice(2)

const async = require("async")
const Galaxy = require("./models/galaxy")
const Planet = require("./models/planet")
const PlanetInstance = require("./models/planetInstance")
const Resource = require("./models/resource")


const mongoose = require("mongoose")
const mongoDB = userArgs[0]
mongoose.connect(mongoDB).catch(error => console.log(error))

mongoose.Promise = global.Promise
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"))

const galaxies = []
const planets = []
const planetInstances = []
const resources = []

function galaxyCreate(name, desc, cb) {
    let galaxyDetail = {name: name, desc: desc}

    const galaxy = new Galaxy(galaxyDetail)

    galaxy.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log("New Galaxy: " + galaxy)
        galaxies.push(galaxy)
        cb(null, galaxy)
    }  )
}

function resourceCreate(name, cost, desc, benefit, cb) {
    const resource = new Resource({
        name: name,
        cost: cost,
        desc: desc,
        benefit: benefit
    })

    resource.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log("New Resource: " + resource)
        resources.push(resource)
        cb(null, resource)
    }   )
}

function planetCreate(astronomicalName, desc, planetType, requiredResources = [], galaxy, price, numInStock, cb) {
    let planetDetail = {
        astronomicalName: astronomicalName,
        planetType: planetType,
        requiredResources: requiredResources,
        galaxy: galaxy,
        desc: desc,
        price: price,
        numInStock: numInStock
    }

    const planet = new Planet(planetDetail)
    planet.save(function (err) {
        if (err) {
            cb(err, null)
            return
        }
        console.log("New Planet: " + planet)
        planets.push(planet)
        cb(null, planet)
    }  )
}


function planetInstanceCreate(planet, owned = false, name = "", resources = []) {
    let planetInstanceDetail = {
        planet: planet,
        owned: owned,
        name: name,
        resources: resources
    }

    const planetInstance = new PlanetInstance(planetInstanceDetail)
    planetInstance.save(function (err) {
        if (err) {
            console.log("ERROR CREATING PlanetInstance: " + planetInstance)
        }
        console.log("New PlanetInstance: " + planetInstance)
        planetInstances.push(planetInstance)
    }  )
}

function createResources(cb) {
    async.series([
            function(callback) {
                resourceCreate("Biome-Generator", 10000, "A sort of force field that protects your citizens from the elements", "Lets your citizens live in peace.", callback);
            },
            function(callback) {
                resourceCreate("Air-Filtration", 10000, "A pump like thing, that produces breathable oxygen.", "Lets your citizens breath.", callback);
            },
            function(callback) {
                resourceCreate("Pest-Removal", 10000, "A task force of highly trained bug removal technicians will kindly relocate all pests from your planet","Removes all pests, whew!", callback);
            },
            function(callback) {
                resourceCreate("Fortification", 10000, "Stops possible attacks.","Keeps your planet a safe place.", callback);
            }
        ],
        // optional callback
        cb);
}


function createGalaxies(cb) {
    async.series([
            function(callback) {
                galaxyCreate("Conjured Arcadia", "A possibly magical universe, origin unknown. This galaxy boasts spacious planetary buffers, 5 different suns, low solar storm frequency, and is safely 0.00000093472 light years from the nearest black hole.", callback)
            },
            function(callback) {
                galaxyCreate("Polaris Circling", "This galaxy is named for the arrangement of its 7 main planets which happen to resemble our own milky way's Ursa Minor constellation. The 'North Star' of Ursa Minor is polaris, hence this galaxies name.", callback)
            },
            function(callback) {
                galaxyCreate("Horizon Forge", "Believed to once be the home to an ancient race of space-dwarves. This now desolate galaxy offers the universes most dry, arid planets, with rich mineral deposits. The sun here is approx. 13 times hotter than the milky ways.", callback)
            }
        ],
        cb)
}


function createPlanets(cb) {
    async.parallel([
            function(callback) {
                planetCreate("Equinox of Celeste", "A single day lasts 43.81 hours and a year lasts 213 days. The planet is made up of 11 continents, which make up 89% of the planet's landmass. 2 moon(s) orbit the planet and the planet itself orbits a red sun in an elliptic orbit.","no_atmosphere", ["Biome-Generator"], galaxies[0],50000, 3, callback)
            },
            function(callback) {
                planetCreate("Lodestar Burning", "A beautiful and picturesque planet, with the small - albeit insignificant - downside of not having an atmosphere. This planet offers abundant natural resources, but requires a Biome-Generator", "normal", [], galaxies[0], 28000, 4,callback)
            },
            function(callback) {
                planetCreate("Mists of Ceres", "The planet Mist of Ceres, named so by its discoverer, is a rogue planet in a fairly small solar system with eight other planets. This planet is about 0.7 times bigger than Earth and its gravity is about 0.90 times that of Earth.", "normal", [], galaxies[1], 41000, 1, callback)
            },
            function(callback) {
                planetCreate("Winged Dust","Winds of 1400 km/hr cause this planet to be relatively cool, a huge bonus if you don't like the heat! The planets crust is made of cadmium, so, combined with the natural wind, an Air-Filtration-System will be required.", "toxic", ["Air-Filtration-System"], galaxies[1], 30000, 5, callback)
            },
            function(callback) {
                planetCreate("Cyber Oblivion", "Computer parts as far as they eye can see. Some advanced civilization must have lived here before. There seems to be lots of rare metals laying about, ripe for collection!", "normal", [], galaxies[2], 65000, 2, callback)
            },
            function(callback) {
                planetCreate("Everlasting Whiterun", "Famous for its beloved 'Cloud District', this planet boats an almost nordic environment. Unfortunately, it is infested with a parasitic bug: Nazeem-ites, which MUST be removed via Pest-Removal, unless you want to be annoyed endlessly.", "normal", ["Pest-Removal"], galaxies[2], 10000, 3, callback)
            },
            function(callback) {
                planetCreate("Tomorrows Shadow", "This planets got a special dark-matter like substance floating through the air, this causes your shadow to appear a day behind your movement - strange. Otherwise it's a lovely place, feels kind of like a big Vermont.", "normal", [], galaxies[0], 48500, 4, callback)
            },
            function(callback) {
                planetCreate("Atlantis Retaliating", "Lot's of water here, probably not suitable for a land based species. Pros: Lots of salmon, magikarp, and trout. Cons: will need a Biome-Generator", "water", ["Biome-Generator"], galaxies[1], 37000, 5, callback)
            },
            function(callback) {
                planetCreate("Heir of Dunwall", "Originally discovered by astronaut Emily Kaldwin, after a small dispute over ownership, the planet was left abandoned. There seems to be a blood-fly issue will require some TLC", "normal", ["Pest-Removal"], galaxies[0], 52000,3, callback)
            },
            function(callback) {
                planetCreate("Upper Kaer Morhen", "*Grumbles with a frustrated tone* Good for the winter, not good for defending against hordes of mages. This planet is mostly stone, natural resources include silver-meteorite. Will require some fortification, lest another mage attack.", "normal", ["Fortification"], galaxies[1], 37000, 2, callback)
            }
        ],
        cb)
}


function createPlanetInstances(cb) {
    async.parallel([
            function(callback) {
                planetInstanceCreate(planets[0],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[0],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[0],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[1],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[1],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[1],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[1],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[2],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[3],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[3],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[3],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[3],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[3],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[4],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[4],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[5],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[5],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[5],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[6],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[6],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[6],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[6],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[7],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[7],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[7],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[7],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[7],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[8],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[8],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[8],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[9],false, callback)
            },
            function(callback) {
                planetInstanceCreate(planets[9],false, callback)
            }
        ],
        cb)
}


async.series([
        createResources,
        createGalaxies,
        createPlanets,
        createPlanetInstances
    ],
    function(err, results) {
        if (err) {
            console.log("FINAL ERR: "+err)
        }
        else {

            console.log("Planet instances: " + planetInstances)

        }
        console.log(results)
        mongoose.connection.close()
    })

