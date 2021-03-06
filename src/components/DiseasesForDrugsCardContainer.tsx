import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import { diseasesForDrugUrl } from "../urls";

const DiseasesForDrugsCardContainer = () => {
  const { id } = useParams();
  const { data, isLoading } = useApi<{ results: DiseaseData[] }>(
    diseasesForDrugUrl(id)
  );
  return (
    <PageTemplate
      context={Context.DISEASE}
      id={id}
      length={data?.results.length}
      isLoading={isLoading}
    >
      {data?.results.map((item) => (
        <DiseaseCard data={item} key={item.diseaseId} />
      ))}
    </PageTemplate>
  );
};

export default DiseasesForDrugsCardContainer;
