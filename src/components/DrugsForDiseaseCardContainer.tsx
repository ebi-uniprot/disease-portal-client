import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import DrugsCard, { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const DrugsForDiseaseCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    `${baseUrl}/disease/${id}/drugs`
  );
  return (
    <PageTemplate
      context={Context.DRUG}
      id={id}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      {data &&
        data.results.map((item: DrugsData) => (
          <DrugsCard data={item} key={v1()} />
        ))}
    </PageTemplate>
  );
};

export default withRouter(DrugsForDiseaseCardContainer);
