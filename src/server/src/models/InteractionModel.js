const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interactionSchema = new Schema({
  siret: { type: String, index: true },
  date: Date,
  unite: String,
  type_intervention: String,
  cible_intervention: String,
  pole: String
});

interactionSchema.statics.findBySIRET = function(siret, cb) {
  return this.find({ siret: siret })
    .sort("-date")
    .exec(cb);
};

const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = Interaction;
