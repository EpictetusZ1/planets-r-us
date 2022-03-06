const mongoose = require("mongoose")
const Schema = mongoose.Schema

const GalaxySchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 100},
        desc: {type: String, required: true, maxLength: 240}
    }, {versionKey: false}
)

GalaxySchema
    .virtual("url")
    .get( () => "/galaxies/" + this._id)

GalaxySchema
    .virtual("imgUrl")
    .get( () => `/public/images/galaxyAssets/${this._id}.gif`)

module.exports = mongoose.model("Galaxy", GalaxySchema)
