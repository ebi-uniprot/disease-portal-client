import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import { Card, InfoList } from "franklin-sites";
import DrugsCard, { DrugsData } from "./DrugsCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";

const DrugsForDiseaseCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/disease/${id}/drugs`
  );
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default withRouter(DrugsForDiseaseCardContainer);