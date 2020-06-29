import React, { Fragment, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import DiseaseCard, { DiseaseData } from "./cards/DiseaseCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import PageContainer from "../layout/PageContainer";
import ProteinContainer from "./ProteinContainer";
import { baseUrl } from "../config";

const DiseasesForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<{ results: DiseaseData[] }>(
    `${baseUrl}/protein/${id}/diseases`
  );
  return (
    <Fragment>
      <PageContainer
        leftColumn={<ProteinContainer id={id} />}
        rightColumn={
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
        }
      />
    </Fragment>
  );
};

export default DiseasesForProteinCardContainer;
