import React, { FC, useEffect } from "react";
import ProtvistaDatatable from "protvista-datatable";
import {
  VariantData,
  ProtvistaDatatableType,
  loadWebComponent,
} from "../cards/VariantCard";

export type DiseaseVariant = {
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

const VariantsTable: FC<{ data: VariantData[]; diseaseId: string }> = ({
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
