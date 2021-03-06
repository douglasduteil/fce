import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../elements/Value";

class EstablishmentEnterpriseIdentity extends React.Component {
  render() {
    const { enterprise, headOffice } = this.props;

    return (
      <section
        id="identity-en"
        className="enterprise-section bg-info text-white"
      >
        <h1 className="title h4">Identité de l&apos;entreprise</h1>

        <dl className="dl row">
          {enterprise.categorie_juridique
            ? [
                <dt className="dt col-md-4" key="rs_label">
                  Raison Sociale
                </dt>,
                <dd className="dd definition col-md-8" key="rs_value">
                  <Value value={enterprise.raison_sociale} empty="-" />
                </dd>
              ]
            : [
                <dt className="dt col-md-4" key="name_label">
                  Nom
                </dt>,
                <dd className="dd definition col-md-8" key="name_value">
                  <Value value={enterprise.nom} empty="-" />
                </dd>,
                <dt className="dt col-md-4" key="firstname_label">
                  Prenom
                </dt>,
                <dd className="dd definition col-md-8" key="firstname_value">
                  <Value value={enterprise.prenom} empty="-" />
                </dd>
              ]}

          <dt className="dt col-md-4">SIREN</dt>
          <dd className="dd col-md-8">
            <Link to={`/enterprise/${enterprise.siren}`}>
              <Value value={enterprise.siren} empty="-" />
            </Link>
          </dd>

          <dt className="dt col-md-4">SIRET du siège social</dt>
          <dd className="dd col-md-8">
            <Link to={`/establishment/${headOffice.siret}`}>
              <Value value={headOffice.siret} empty="" />
            </Link>
          </dd>
        </dl>
      </section>
    );
  }
}

export default EstablishmentEnterpriseIdentity;
