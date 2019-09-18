import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";

const ProteinsForDrugsCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/drug/${id}/proteins`
  );
  return (
    <Fragment>
      <PageTemplate
        context={Context.PROTEIN}
        id={id}
        length={data && data.results.length}
        isLoading={isLoading}
      >
        {data &&
          data.results.map((item: ProteinData) => (
            <ProteinCard data={item} id={id} key={v1()} />
          ))}
      </PageTemplate>
    </Fragment>
  );
};

export default withRouter(ProteinsForDrugsCardContainer);
