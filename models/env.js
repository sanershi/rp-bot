let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let env = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},
    env: { type: Array, default: [] },
    coin: { type: Number, default: 0 }
})

module.exports = mongoose.model("env", env)