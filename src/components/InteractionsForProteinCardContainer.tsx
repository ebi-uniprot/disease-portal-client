import React, { FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import InteractionViewer from "interaction-viewer";
import { loadWebComponent } from "./cards/VariantCard";
import useApi from "./hooks/UseApi";
import { Card } from "franklin-sites";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const InteractionsForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { proteinid } = match.params;
  const { data, isLoading } = useApi<{ results: [] }>(
    `${baseUrl}/protein/${proteinid}/interactions`
  );
  loadWebComponent("interaction-viewer", InteractionViewer);

  return (
    <PageTemplate
      context={Context.INTERACTION}
      id={proteinid}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      <Card title="Interactions">
        <interaction-viewer accession={proteinid} />
      </Card>
    </PageTemplate>
  );
};

export default withRouter(InteractionsForProteinCardContainer);
