import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { proteinsForDrugUrl } from "../urls";

const ProteinsForDrugsCardContainer = () => {
  const { drugid } = useParams();
  const { data, isLoading } = useApi<{ results: ProteinData[] }>(
    proteinsForDrugUrl(drugid)
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
