import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import VariantsTable, { DiseaseVariant } from "./tables/VariantsTable";
import { variantsForDiseaseUrl } from "../urls";
import spinner from "../svg/spinner.svg";

const VariantsForDiseaseContainer: FunctionComponent<RouteComponentProps<{
  diseaseid: string;
}>> = ({ match }) => {
  const { diseaseid } = match.params;

  const { data, isLoading } = useApi<{ results: DiseaseVariant[] }>(
    variantsForDiseaseUrl(diseaseid)
  );

  if (isLoading || !data) {
    return (
      <section className="spinner-container">
        <img src={spinner} alt="logo" width={120} height={50} />
      </section>
    );
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
