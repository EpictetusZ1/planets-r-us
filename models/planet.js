const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PlanetSchema = new Schema(
    {
        astronomicalName: {type: String, required: true, maxLength: 100},
        desc: {type: String, required: true, maxLength: 240},
        planetType: {type: String, required: true, maxLength: 50},
        requiredResources: [{type:String}],
        galaxy: {type: Schema.Types.ObjectId, ref: "Galaxy", required: true},
        price: {type: Number, required: true},
        numInStock: {type: Number, required: true},
    }, {versionKey: false}
)

PlanetSchema
    .virtual("url")
    .get( function() { return `/planetary-registry/planets/${this._id}` })

PlanetSchema
    .virtual("imgUrl")
    .get( function() { return `/images/planetAssets/${this._id}.gif`} )

module.exports = mongoose.model("Planet", PlanetSchema)
