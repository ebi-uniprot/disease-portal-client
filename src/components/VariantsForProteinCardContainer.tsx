import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import VariantCard, { VariantData } from "./VariantCard";

const VariantsForProteinCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data } = useApi(
    `https://www.ebi.ac.uk/proteins/api/variation/${id}?format=json`
  );
  if (!data) {
    return null;
  }
  const filteredData = {
    sequence: data.sequence,
    features: data.features.filter(
      (d: VariantData) =>
        d.sourceType.includes("uniprot") || d.sourceType.includes("mixed")
    )
  };

  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {filteredData.features.length} variants for {id}
        </h2>
      </div>
      <VariantCard data={filteredData} />
    </Fragment>
  );
};

export default withRouter(VariantsForProteinCardContainer);
