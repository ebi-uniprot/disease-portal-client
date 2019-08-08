import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PathwayCard, { PathwayData } from "./PathwayCard";

const PathwaysForProteinCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/xrefs`
  );
  if (!data) {
    return null;
  }
  let pathwayCardNodes: ReactElement[] = [];
  data.results.forEach((item: PathwayData) => {
    if (item.dbType === "Reactome") {
      pathwayCardNodes.push(<PathwayCard data={item} key={v1()} />);
    }
  });
  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {pathwayCardNodes.length} pathways for {id}
        </h2>
      </div>
      {pathwayCardNodes}
    </Fragment>
  );
};

export default withRouter(PathwaysForProteinCardContainer);
