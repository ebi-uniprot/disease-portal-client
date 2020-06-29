import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import { baseUrl } from "../config";

const DiseasesForDrugsCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<{ results: DiseaseData[] }>(
    `${baseUrl}/drug/${id}/diseases`
  );
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default withRouter(DiseasesForDrugsCardContainer);
