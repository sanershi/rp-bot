let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let susadim = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},
    susadim: { type: Number, default: 10 },
})

module.exports = mongoose.model("susadim", susadim)