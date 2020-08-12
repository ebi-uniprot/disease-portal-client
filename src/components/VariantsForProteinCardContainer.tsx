import React from "react";
import { useParams } from "react-router";

import useApi from "./hooks/UseApi";
import VariantCard, { VariationData } from "./cards/VariantCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { variantsForProteinUrl } from "../urls";

const VariantsForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<VariationData>(
    variantsForProteinUrl(proteinid)
  );
  return (
    <PageTemplate
      context={Context.VARIANT}
      id={proteinid}
      length={data?.features.length}
      isLoading={isLoading}
    >
      {data && <VariantCard data={data} accession={proteinid} />}
    </PageTemplate>
  );
};

export default VariantsForProteinCardContainer;
