import React from "react";
import { useParams } from "react-router";
import { ProteinsAPIVariation } from "protvista-variation-adapter/dist/es/variants";

import useApi from "./hooks/UseApi";
import VariantCard from "./cards/VariantCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { variantsForProteinUrl } from "../urls";

const VariantsForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<ProteinsAPIVariation>(
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
