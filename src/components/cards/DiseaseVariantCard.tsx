import React, { FunctionComponent, useEffect } from "react";
import ProtvistaDatatable from "protvista-datatable";
import { Card } from "franklin-sites";
import { loadWebComponent, ProtvistaDatatableType } from "./VariantCard";
import { Link } from "react-router-dom";
import { Context } from "../../types/context";

loadWebComponent("protvista-datatable", ProtvistaDatatable);

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

const columns = {
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
};

const DiseaseVariantCard: FunctionComponent<{
  data: DiseaseVariant[];
  accession: string;
}> = ({ data, accession }) => {
  useEffect(() => {
    const protvistaDatatable = document.querySelector<ProtvistaDatatableType>(
      `[data-uuid='${accession}_table']`
    );
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns;
      protvistaDatatable.data = data;
    }
  }, [data, accession]);

  return (
    <Card title={`For protein ${accession}`} key={accession}>
      <protvista-datatable height="20" data-uuid={`${accession}_table`} />
      <div>
        <Link to={`/${Context.VARIANT}/${accession}/${Context.PROTEIN}`}>
          See all variants for {accession}
        </Link>
      </div>
    </Card>
  );
};

export default DiseaseVariantCard;
