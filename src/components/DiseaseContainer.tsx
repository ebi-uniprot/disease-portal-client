import React, { Fragment, FunctionComponent } from "react";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import { baseUrl } from "../config";

const DiseaseContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi<{ result: DiseaseData }>(`${baseUrl}/diseases/${id}`);
  if (!data) {
    return null;
  }
  const { result } = data;
  return <Fragment>{result && <DiseaseCard data={result} />}</Fragment>;
};

export default DiseaseContainer;
