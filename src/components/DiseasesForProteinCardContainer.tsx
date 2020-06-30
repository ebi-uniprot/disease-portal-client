import React, { Fragment, FunctionComponent } from "react";
import { RouteComponentProps, useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const DiseasesForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: DiseaseData[] }>(
    `${baseUrl}/protein/${proteinid}/diseases`
  );
  return (
    <Fragment>
      <PageTemplate
        context={Context.DISEASE}
        id={proteinid}
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

export default DiseasesForProteinCardContainer;
