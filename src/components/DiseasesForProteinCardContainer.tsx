import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { diseasesForProteinsUrl } from "../urls";

const DiseasesForProteinCardContainer = () => {
  const { proteinid } = useParams();
  // TODO: check if a response could be defined, but its `results` field no
  // TODO: if so, we need to apply this ?: type everywhere, not just here
  const { data, isLoading } = useApi<{ results?: DiseaseData[] }>(
    diseasesForProteinsUrl(proteinid)
  );

  return (
    <PageTemplate
      context={Context.DISEASE}
      id={proteinid}
      length={data?.results?.length}
      isLoading={isLoading}
    >
      {data?.results?.map((item) => (
        <DiseaseCard data={item} key={item.diseaseId} />
      ))}
    </PageTemplate>
  );
};

export default DiseasesForProteinCardContainer;
