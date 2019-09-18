import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import DrugsCard, { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";
import PageContainer from "../PageContainer";
import ProteinContainer from "./ProteinContainer";

const DrugsForProteinCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/drugs`
  );

  return (
    <Fragment>
      <PageContainer
        leftColumn={<ProteinContainer id={id} />}
        rightColumn={
          <PageTemplate
            context={Context.DRUG}
            id={id}
            length={data && data.results.length}
            isLoading={isLoading}
          >
            {data &&
              data.results.map((item: DrugsData) => (
                <DrugsCard data={item} key={v1()} />
              ))}
          </PageTemplate>
        }
      />
    </Fragment>
  );
};

export default withRouter(DrugsForProteinCardContainer);
