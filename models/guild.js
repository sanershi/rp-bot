let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let guildsettings = Schema({
    guild: {type: String, default: ""},
    açlıkdurum: {type: Boolean, default: true},
    susuzlukdurum: {type: Boolean, default: true},
})

module.exports = mongoose.model("guildsettings", guildsettings)