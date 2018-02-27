const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const codePostalSchema = new Schema({
  code_postal: String,
  code_commune: String,
  libelle_commune: String
});

const CodePostal = mongoose.model("CodePostal", codePostalSchema);

module.exports = CodePostal;
