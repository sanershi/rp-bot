let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let depo = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},
    env: { type: Array, default: [] }
})

module.exports = mongoose.model("depo", depo)