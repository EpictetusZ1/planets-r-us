const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanetInstanceSchema = new Schema(
    {
        planet: {type: Schema.Types.ObjectId, ref: "Planet", required: true},
        owned: {type: Boolean, required: true},
        resources: [{type: String}],
        name: {type: String}
    }, {versionKey: false}
)

PlanetInstanceSchema
    .virtual("url")
    .get( function() { return `/planetary-registry/planetinstances/${this._id}` })

module.exports = mongoose.model("PlanetInstance", PlanetInstanceSchema)
