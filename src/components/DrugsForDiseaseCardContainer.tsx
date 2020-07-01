import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";
import DrugsCardCompact from "./cards/DrugsCardCompact";

const DrugsForDiseaseCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = () => {
  const { diseaseid, drugid } = useParams();

  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    `${baseUrl}/disease/${diseaseid}/drugs`
  );

  return (
    <PageTemplate
      context={Context.DRUG}
      id={diseaseid}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      {data &&
        data.results.map((item: DrugsData) => (
          <DrugsCardCompact data={item} diseaseId={diseaseid} key={v1()} />
        ))}
    </PageTemplate>
  );
};

export default withRouter(DrugsForDiseaseCardContainer);
