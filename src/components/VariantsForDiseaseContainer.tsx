import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import VariantsTable, { DiseaseVariant } from "./tables/VariantsTable";
import { variantsForDiseaseUrl } from "../urls";

const VariantsForDiseaseContainer: FunctionComponent<RouteComponentProps<{
  diseaseid: string;
}>> = ({ match }) => {
  const { diseaseid } = match.params;

  const { data, isLoading } = useApi<{ results: DiseaseVariant[] }>(
    variantsForDiseaseUrl(diseaseid)
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
