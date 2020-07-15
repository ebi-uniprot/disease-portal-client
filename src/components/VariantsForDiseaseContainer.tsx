import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";
import VariantsTable, { DiseaseVariant } from "./tables/VariantsTable";

const VariantsForDiseaseContainer: FunctionComponent<RouteComponentProps<{
  diseaseid: string;
}>> = ({ match }) => {
  const { diseaseid } = match.params;

  const { data, isLoading } = useApi<{ results: DiseaseVariant[] }>(
    `${baseUrl}/disease/${diseaseid}/variants`
  );

  if (!data) {
    return null;
  }

  const { results } = data;

  return (
    <PageTemplate
      context={Context.VARIANT}
      id={diseaseid}
      length={results && results.length}
      isLoading={isLoading}
    >
      <VariantsTable diseaseId={diseaseid} data={results} />
    </PageTemplate>
  );
};

export default VariantsForDiseaseContainer;
