let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let msgxp = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 0 },
})

module.exports = mongoose.model("msgxp", msgxp)