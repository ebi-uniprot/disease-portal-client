import React, { FC, useEffect } from "react";
import ProtvistaDatatable from "protvista-datatable";
import { ProtvistaDatatableType, loadWebComponent } from "../cards/VariantCard";
import { html } from "lit-html";
import { ContextObj, Context } from "../../types/context";

export type DiseaseVariant = {
  proteinAccession: string;
  altSeq: string;
  featureId: string;
  featureLocation: {
    startModifier: string;
    endModifier: string;
    startId: number;
    endId: number;
  };
  featureStatus: string;
  origSeq: string;
  report: string;
};

loadWebComponent("protvista-datatable", ProtvistaDatatable);

const columns = (diseaseId: string) => ({
  accession: {
    label: "Protein",
    resolver: (variant: DiseaseVariant) =>
      html`<a
        href="/${ContextObj[Context.DISEASE].id}/${diseaseId}/${ContextObj[
          Context.PROTEIN
        ].id}/${variant.proteinAccession}/${ContextObj[Context.PROTEIN].id}"
        >${variant.proteinAccession}</a
      >`,
  },
  position: {
    label: "Position",
    resolver: (variant: DiseaseVariant) => variant.featureLocation.startId,
  },
  variation: {
    label: "Variation",
    resolver: (variant: DiseaseVariant) =>
      `${variant.origSeq} -> ${variant.altSeq}`,
  },
  id: {
    label: "Feature ID",
    resolver: (variant: DiseaseVariant) => variant.featureId,
  },
  status: {
    label: "Status",
    resolver: (variant: DiseaseVariant) => variant.featureStatus,
  },
  report: {
    label: "Report",
    resolver: (variant: DiseaseVariant) => variant.report,
  },
});

const VariantsTable: FC<{ data: DiseaseVariant[]; diseaseId: string }> = ({
  data,
  diseaseId,
}) => {
  useEffect(() => {
    const protvistaDatatable = document.querySelector<ProtvistaDatatableType>(
      `[data-uuid='${diseaseId}_table']`
    );
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns(diseaseId);
      protvistaDatatable.data = data;
    }
  }, [data, diseaseId]);

  return (
    <section className="full-width">
      <protvista-datatable height="100%" data-uuid={`${diseaseId}_table`} />
    </section>
  );
};

export default VariantsTable;
