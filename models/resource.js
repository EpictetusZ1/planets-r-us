const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ResourceSchema = new Schema(
    {
        name: {type: String, required: true, maxLength: 100},
        cost: {type: Number, required: true},
        desc: {type: String, required: true, maxLength: 240},
        benefit: {type: String, required: true, maxLength: 240},
    }, {versionKey: false}
)

ResourceSchema
    .virtual("url")
    .get( () => "/resources/" + this._id)

ResourceSchema
    .virtual("imgUrl")
    .get( () => `/public/images/resourceAssets/${this._id}.svg`)

module.exports = mongoose.model("Resource", ResourceSchema)
