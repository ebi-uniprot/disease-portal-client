import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import DrugsCard, { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { drugsForProteinUrl } from "../urls";

const DrugsForProteinCardContainer = () => {
  const { proteinid } = useParams<{ proteinid: string }>();
  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    drugsForProteinUrl(proteinid)
  );

  return (
    <PageTemplate
      context={Context.DRUG}
      id={proteinid}
      length={data?.results.length}
      isLoading={isLoading}
    >
      {data?.results.map((item) => (
        <DrugsCard
          data={item}
          key={`${item.name}${item.proteinAccession}${item.moleculeType}`}
        />
      ))}
    </PageTemplate>
  );
};

export default DrugsForProteinCardContainer;
