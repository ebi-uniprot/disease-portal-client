import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import VariantCard from "./VariantCard";

const VariantCardContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const { id } = match.params;
  const { data } = useApi(
    `https://www.ebi.ac.uk/proteins/api/variation/${id}?format=json`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.features.length} variants for {id}
        </h2>
      </div>
      <VariantCard data={data} />
    </Fragment>
  );
};

export default withRouter(VariantCardContainer);
