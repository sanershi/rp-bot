let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let acıktım = Schema({
    user: {type: String, default: ""},
    guild: {type: String, default: ""},
    acıktım: { type: Number, default: 10 },
})

module.exports = mongoose.model("acıktım", acıktım)