import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import ProteinCard, { ProteinData } from "./ProteinCard";

const ProteinCardContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice//disease/${id}/proteins`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.results.length} protein(s) for {id}
        </h2>
      </div>
      {data.results.map((item: ProteinData) => (
        <ProteinCard data={item} key={v1()} />
      ))}
    </Fragment>
  );
};

export default withRouter(ProteinCardContainer);
