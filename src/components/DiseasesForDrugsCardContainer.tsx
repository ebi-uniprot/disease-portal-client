import React from "react";
import { useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import { baseUrl } from "../config";

const DiseasesForDrugsCardContainer = () => {
  const { id } = useParams();
  const { data, isLoading } = useApi<{ results: DiseaseData[] }>(
    `${baseUrl}/drug/${id}/diseases`
  );
  return (
    <PageTemplate
      context={Context.DISEASE}
      id={id}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      {data &&
        data.results.map((item: DiseaseData) => (
          <DiseaseCard data={item} key={v1()} />
        ))}
    </PageTemplate>
  );
};

export default DiseasesForDrugsCardContainer;
