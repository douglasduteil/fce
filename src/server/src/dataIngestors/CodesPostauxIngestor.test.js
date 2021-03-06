require("../mongo/db");

const EtablissementsIngestor = require("./EtablissementsIngestor");
const CodesPostauxIngestor = require("./CodesPostauxIngestor");
const CodePostal = require("../models/CodePostalModel");
const Etablissement = require("../models/EtablissementModel");

const filePath = "./data/SIENE_test.csv";
const TIMEOUT = 10000;

describe("default", () => {
  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);
    const etablissements = etablissementsIngestor.getEtablissements();

    const departementsIngestor = new CodesPostauxIngestor();
    const data = departementsIngestor.getCodesPostauxFromEtablissements(
      etablissements
    );

    expect(data).toEqual([
      { code_postal: "30000" },
      { code_postal: "31770" },
      { code_postal: "31000" },
      { code_postal: "31100" },
      { code_postal: "31500" },
      { code_postal: "31300" }
    ]);
  });
});

describe("save()", () => {
  beforeEach(() => {
    return CodePostal.remove({});
  }, TIMEOUT);

  afterEach(() => {
    return CodePostal.remove({});
  }, TIMEOUT);

  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);
    const etablissements = etablissementsIngestor.getEtablissements();

    const departementsIngestor = new CodesPostauxIngestor();
    const data = departementsIngestor.getCodesPostauxFromEtablissements(
      etablissements
    );
    const saveParams = {
      etablissements
    };
    return departementsIngestor.save(saveParams).then(data => {
      expect(data.length).toEqual(6);
      expect(data[0].code_postal).toEqual("30000");
      expect(data[1].code_postal).toEqual("31770");
    });
  });
});

describe("getCodesPostauxFromMongo()", () => {
  beforeEach(() => {
    return CodePostal.remove({}).then(() => {
      Etablissement.remove({});
    });
  }, TIMEOUT);

  afterEach(() => {
    return CodePostal.remove({}).then(() => {
      Etablissement.remove({});
    });
  }, TIMEOUT);

  test("default", () => {
    const etablissementsIngestor = new EtablissementsIngestor(filePath);

    const codesPostauxsIngestor = new CodesPostauxIngestor();
    const saveParams = {
      mongo: true
    };
    return etablissementsIngestor
      .save()
      .then(data => {
        return codesPostauxsIngestor.getCodesPostauxFromMongo();
      })
      .then(data => {
        expect(data.length).toEqual(6);
        expect(data[0].code_postal).toEqual("30000");
        expect(data[1].code_postal).toEqual("31000");
      });
  });
});
