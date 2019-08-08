import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import InteractionViewer from "interaction-viewer";
import { loadWebComponent } from "./VariantCard";
import useApi from "./UseApi";
import { Card, InfoList } from "franklin-sites";

const InteractionsForProteinCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/protein/${id}/interactions`
  );
  if (!data) {
    return null;
  }
  loadWebComponent("interaction-viewer", InteractionViewer);

  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.results.length} interactions(s) for {id}
        </h2>
      </div>
      <Card title="Interactions">
        <interaction-viewer accession={id} />
      </Card>
    </Fragment>
  );
};

export default withRouter(InteractionsForProteinCardContainer);
