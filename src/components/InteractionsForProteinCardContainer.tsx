import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import InteractionViewer from "interaction-viewer";
import { loadWebComponent } from "./cards/VariantCard";
import useApi from "./UseApi";
import { Card } from "franklin-sites";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import PageContainer from "../layout/PageContainer";
import ProteinContainer from "./ProteinContainer";
import { baseUrl } from "../config";

const InteractionsForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<{ results: [] }>(
    `${baseUrl}/protein/${id}/interactions`
  );
  loadWebComponent("interaction-viewer", InteractionViewer);

  return (
    <Fragment>
      <PageContainer
        leftColumn={<ProteinContainer id={id} />}
        rightColumn={
          <PageTemplate
            context={Context.INTERACTION}
            id={id}
            length={data?.results && data.results.length}
            isLoading={isLoading}
          >
            <Card title="Interactions">
              <interaction-viewer accession={id} />
            </Card>
          </PageTemplate>
        }
      />
    </Fragment>
  );
};

export default withRouter(InteractionsForProteinCardContainer);
