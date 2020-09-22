import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import PathwayCard, { PathwayData } from "./cards/PathwayCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { pathwaysForProteinUrl } from "../urls";

const PathwaysForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: PathwayData[] }>(
    pathwaysForProteinUrl(proteinid)
  );

  const filtered =
    data?.results.filter((item) => item.dbType === "Reactome") || [];

  return (
    <PageTemplate
      context={Context.PATHWAY}
      id={proteinid}
      length={filtered.length}
      isLoading={isLoading}
    >
      {filtered.map((item) => (
        <PathwayCard data={item} protein={proteinid} key={item.primaryId} />
      ))}
    </PageTemplate>
  );
};

export default PathwaysForProteinCardContainer;
