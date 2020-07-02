import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router";
import useApi from "./hooks/UseApi";
import { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";
import DrugsTable from "./tables/DrugsTable";

const DrugsForDiseaseContainer: FunctionComponent<RouteComponentProps<any>> = ({
  history,
}) => {
  const { diseaseid } = useParams();

  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    `${baseUrl}/disease/${diseaseid}/drugs`
  );

  if (!data) {
    return null;
  }

  return (
    <PageTemplate
      context={Context.DRUG}
      id={diseaseid}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      <DrugsTable data={data.results} diseaseId={diseaseid} />
    </PageTemplate>
  );
};

export default withRouter(DrugsForDiseaseContainer);
