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
    .get( function() { return `/planetary-registry/galaxy/${this._id}`} )

GalaxySchema
    .virtual("imgUrl")
    .get( function() { return `/images/galaxyAssets/${this._id}.gif`} )

module.exports = mongoose.model("Galaxy", GalaxySchema)
