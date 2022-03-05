const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanetSchema = new Schema(
    {
        astronomicalName: {type: String, required: true, maxLength: 100},
        planetType: {type: String, required: true, maxLength: 50},
        requiredResources: [{type: Schema.Types.ObjectId, ref: "Resources", required: true}],
        galaxy: {type: Schema.Types.ObjectId, ref: "Galaxy", required: true},
        desc: {type: String, required: true, maxLength: 150},
        price: {type: Number, required: true},
        numInStock: {type: Number, required: true},
    }
)

PlanetSchema
    .virtual("url")
    .get( () => "/planets/" + this._id)

PlanetSchema
    .virtual("imgUrl")
    .get( () => `/public/images/planetAssets/${this._id}.gif`)

module.exports = mongoose.model("Planet", PlanetSchema)
