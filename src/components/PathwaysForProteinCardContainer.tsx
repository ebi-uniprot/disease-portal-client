import React, { Fragment, FunctionComponent, ReactElement } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PathwayCard, { PathwayData } from "./cards/PathwayCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const PathwaysForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: PathwayData[] }>(
    `${baseUrl}/protein/${proteinid}/xrefs`
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
        id={proteinid}
        length={pathwayCardNodes.length}
        isLoading={isLoading}
      >
        {pathwayCardNodes}
      </PageTemplate>
    </Fragment>
  );
};

export default withRouter(PathwaysForProteinCardContainer);
