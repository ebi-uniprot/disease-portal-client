import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PathwayCard, { PathwayData } from "./PathwayCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";

const PathwaysForProteinCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/xrefs`
  );
  let pathwayCardNodes: ReactElement[] = [];
  if (data) {
    data.results.forEach((item: PathwayData) => {
      if (item.dbType === "Reactome") {
        pathwayCardNodes.push(<PathwayCard data={item} key={v1()} />);
      }
    });
  }
  return (
    <Fragment>
      <PageTemplate
        context={Context.PATHWAY}
        id={id}
        length={pathwayCardNodes.length}
        isLoading={isLoading}
      >
        {pathwayCardNodes}
      </PageTemplate>
    </Fragment>
  );
};

export default withRouter(PathwaysForProteinCardContainer);
