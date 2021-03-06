import { nestcribe_path as test } from "../../../../tests/utils";

import utils from "../utils";
import getEntreprise from "./getEntreprise";

test("DataSources/ApiGouv/EntreprisesAPI/getEntreprise", () => {
  describe("sucessfully parse data", async () => {
    const testCases = [
      {
        it: "doesn't copy useless values",
        data: { useless: true, entreprise: { also_useless: true } },
        expected: {}
      },
      {
        it: "does copy categorie_entreprise",
        data: {
          entreprise: {
            categorie_entreprise: "entreprise"
          }
        },
        expected: {
          categorie_entreprise: "entreprise"
        }
      },
      {
        it: "expects tranche_effectif_salarie_entreprise to be an object",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: null
          }
        },
        expected: {}
      },
      {
        it: "sets unknown data about tranche_effectif to undefined",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: {}
          }
        },
        expected: {
          annee_tranche_effectif: undefined,
          tranche_effectif: undefined
        }
      },
      {
        it: "extract data about tranche_effectif",
        data: {
          entreprise: {
            tranche_effectif_salarie_entreprise: {
              date_reference: 2015,
              intitule: "Tranche 2"
            }
          }
        },
        expected: {
          annee_tranche_effectif: 2015,
          tranche_effectif: "Tranche 2"
        }
      },
      {
        it: "add mandataires_sociaux data",
        data: {
          entreprise: {
            mandataires_sociaux: [
              {
                fonction: "Président",
                prenom: "Michel",
                nom: "Michot"
              },
              {
                fonction: "Direction",
                raison_sociale: "Michel Industries"
              }
            ]
          }
        },
        expected: {
          mandataires_sociaux: [
            {
              nom: "Michot",
              prenom: "Michel",
              fonction: "Président",
              raison_sociale: undefined
            },
            {
              nom: undefined,
              prenom: undefined,
              raison_sociale: "Michel Industries",
              fonction: "Direction"
            }
          ]
        }
      }
    ];

    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      it(testCase.it || `tests case n°${i + 1}`, async () => {
        const result = await getEntreprise(
          testCase.identifier || null,
          {
            get: args =>
              Promise.resolve({
                data:
                  typeof testCase.data === "function"
                    ? testCase.data(...args)
                    : testCase.data
              })
          },
          {}
        );

        expect(result).toEqual(testCase.expected);
      });
    }
  });

  it("handles invalid data", async () => {
    expect(
      await getEntreprise(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: null
            })
        },
        {}
      )
    ).toEqual({});

    expect(
      await getEntreprise(
        "SIREN",
        {
          get: () =>
            Promise.resolve({
              data: {
                entreprise: null
              }
            })
        },
        {}
      )
    ).toEqual({});
  });

  it("returns an empty data when it fails", async () => {
    const Axios = {
      get: () => Promise.reject()
    };

    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementationOnce(() => {});

    const result = await getEntreprise("ERRORSIREN", Axios, {});
    expect(result).toEqual({});
  });
});
