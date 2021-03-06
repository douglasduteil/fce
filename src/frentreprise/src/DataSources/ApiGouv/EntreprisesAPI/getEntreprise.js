import utils from "../utils";

const getEntreprise = async (SIREN, Axios, params) => {
  return await utils.requestAPI(
    Axios,
    `entreprises/${SIREN}`,
    params,
    (out, data) => {
      if (data && data.entreprise) {
        const ent = data.entreprise;

        ["categorie_entreprise"].forEach(key => {
          if (typeof ent[key] !== "undefined") {
            out[key] = ent[key];
          }
        });

        if (
          ent.tranche_effectif_salarie_entreprise &&
          typeof ent.tranche_effectif_salarie_entreprise === "object"
        ) {
          out.annee_tranche_effectif =
            +ent.tranche_effectif_salarie_entreprise.date_reference ||
            undefined;
          out.tranche_effectif =
            ent.tranche_effectif_salarie_entreprise.intitule || undefined;
        }

        if (Array.isArray(ent.mandataires_sociaux)) {
          out.mandataires_sociaux = [];
          ent.mandataires_sociaux.forEach(manso => {
            out.mandataires_sociaux.push({
              nom: manso.nom,
              prenom: manso.prenom,
              fonction: manso.fonction,
              raison_sociale: manso.raison_sociale
            });
          });
        }
      }
    }
  );
};

export default getEntreprise;
