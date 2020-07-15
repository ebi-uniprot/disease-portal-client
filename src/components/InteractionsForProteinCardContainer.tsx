import React from "react";
import { useParams } from "react-router";
import InteractionViewer from "interaction-viewer";
import { loadWebComponent } from "./cards/VariantCard";
import useApi from "./hooks/UseApi";
import { Card } from "franklin-sites";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const InteractionsForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: [] }>(
    `${baseUrl}/protein/${proteinid}/interactions`
  );
  loadWebComponent("interaction-viewer", InteractionViewer);

  return (
    <PageTemplate
      context={Context.INTERACTION}
      id={proteinid}
      length={data?.results.length}
      isLoading={isLoading}
    >
      <Card>
        <h4>Interactions</h4>
        <interaction-viewer accession={proteinid} />
      </Card>
    </PageTemplate>
  );
};

export default InteractionsForProteinCardContainer;
