let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let shop = Schema({
    guild: {type: String, default: ""},
    item: { type: Array, default: [] },
})

module.exports = mongoose.model("shop", shop)