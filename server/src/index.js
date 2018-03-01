const path = require("path");

const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const frentreprise = __DIST
  ? require("frentreprise")
  : require("../lib/frentreprise/src/frentreprise.js");

frentreprise.EntrepriseModel = require("./models/Entreprise");
frentreprise.EtablissementModel = require("./models/Etablissement");
frentreprise.getDataSource("ApiGouv").source.token = config.get(
  "APIGouv.token"
);

var apiRouter = require("./api");

//DB setup
if (config.has("mongo")) {
  mongoose.connect(config.get("mongodb"));
}

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const htdocs_path = path.resolve(__dirname, "./htdocs");
app.use(express.static(htdocs_path));

app.use("/api", apiRouter);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Serving files from: ${htdocs_path}`);
  console.log(`Listening on port: ${PORT}`);
});
