import React, { FunctionComponent } from "react";
import { useParams } from "react-router";
import useApi from "./hooks/UseApi";
import { DiseaseData } from "./cards/DiseaseCard";
import { baseUrl } from "../config";
import DiseaseCardCompact from "./cards/DiseaseCardCompact";

const DiseaseContainer: FunctionComponent<{ id: string }> = () => {
  const { id } = useParams();
  const { data } = useApi<{ result: DiseaseData }>(`${baseUrl}/diseases/${id}`);
  if (!data) {
    return null;
  }
  const { result } = data;
  if (!result) {
    return null;
  }
  return <DiseaseCardCompact data={result} />;
};

export default DiseaseContainer;
