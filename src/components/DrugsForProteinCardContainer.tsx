import React from "react";
import { useParams } from "react-router";
import { groupBy } from "lodash";

import useApi from "./hooks/UseApi";
import DrugsCard, { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { drugsForProteinUrl } from "../urls";

export type DrugsDataGrouped = {
  name: string;
};

const DrugsForProteinCardContainer = () => {
  const { proteinid } = useParams<{ proteinid: string }>();
  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    drugsForProteinUrl(proteinid)
  );

  // Group drugs by name
  const groupedData = groupBy(data?.results, "name");

  return (
    <PageTemplate
      context={Context.DRUG}
      id={proteinid}
      length={data?.results.length}
      isLoading={isLoading}
    >
      {Object.keys(groupedData).map((drugName) => (
        <DrugsCard
          drugName={drugName}
          data={groupedData[drugName]}
          key={drugName}
        />
      ))}
    </PageTemplate>
  );
};

export default DrugsForProteinCardContainer;
