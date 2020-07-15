import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";

const ProteinsForDrugsCardContainer = () => {
  const { drugid } = useParams();
  const { data, isLoading } = useApi<{ results: ProteinData[] }>(
    `${baseUrl}/drug/${drugid}/proteins`
  );
  return (
    <PageTemplate
      context={Context.PROTEIN}
      id={drugid}
      length={data?.results.length}
      isLoading={isLoading}
    >
      {data?.results.map((item) => (
        <ProteinCard data={item} id={drugid} key={item.accession} />
      ))}
    </PageTemplate>
  );
};

export default ProteinsForDrugsCardContainer;
