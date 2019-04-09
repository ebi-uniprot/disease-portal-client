import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PathwayCard, { PathwayData } from "./PathwayCard";

const PathwayCardContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/xrefs`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.results.length} pathways for {id}
        </h2>
      </div>
      {data.results.map((item: PathwayData) => (
        <PathwayCard data={item} key={v1()} />
      ))}
    </Fragment>
  );
};

export default withRouter(PathwayCardContainer);
