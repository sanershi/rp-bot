let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let afk = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},

    type: {type: Boolean, default: false},
    sebep: {type: String, default: ""},
    time: {type: Number, default: Date.now()},
})

module.exports = mongoose.model("afk", afk)