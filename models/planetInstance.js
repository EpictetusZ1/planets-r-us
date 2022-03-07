const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanetInstanceSchema = new Schema(
    {
        planet: {type: Schema.Types.ObjectId, ref: "Planet", required: true},
        owned: {type: Boolean, required: true},
        resources: [{type: Schema.Types.ObjectId, ref: "Resource"}]
    }, {versionKey: false}
)

PlanetInstanceSchema
    .virtual("url")
    .get( () => "/planets/planetinstance/" + this._id)

module.exports = mongoose.model("PlanetInstance", PlanetInstanceSchema)
