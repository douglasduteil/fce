import React from "react";
import { Link } from "react-router-dom";
import Value from "../../../../elements/Value";

class Establishment extends React.Component {
  render() {
    const { establishment } = this.props;
    const nbInteractions = Array.isArray(establishment.direccte)
      ? establishment.direccte.length
      : 0;

    return (
      <ul className="list-unstyled">
        <li>
          <Value value={establishment.enseigne} empty="" />
        </li>
        <li>
          <Link to={`/establishment/${establishment.siret}`}>
            <Value value={establishment.siret} empty="" />
          </Link>
        </li>
        <li>
          <Value
            value={
              establishment.etat_etablissement &&
              establishment.etat_etablissement.label
            }
            empty=""
          />{" "}
          - <Value value={establishment.departement} empty="" /> -{" "}
          <Value
            value={
              establishment.adresse_components &&
              establishment.adresse_components.localite
            }
            empty=""
          />
          {" - "}
          {nbInteractions > 1
            ? `${nbInteractions} interactions`
            : `${nbInteractions} interaction`}
        </li>
      </ul>
    );
  }
}

export default Establishment;
