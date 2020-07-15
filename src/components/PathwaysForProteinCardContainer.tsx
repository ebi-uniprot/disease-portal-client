import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import PathwayCard, { PathwayData } from "./cards/PathwayCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const PathwaysForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: PathwayData[] }>(
    `${baseUrl}/protein/${proteinid}/xrefs`
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
        <PathwayCard data={item} key={item.primaryId} />
      ))}
    </PageTemplate>
  );
};

export default PathwaysForProteinCardContainer;
