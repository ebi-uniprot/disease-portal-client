import React, { FunctionComponent, useEffect, useState } from "react";
import ProtvistaVariation from "protvista-variation";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaDatatable from "protvista-datatable";
import { v1 } from "uuid";
import { Card } from "franklin-sites";

export type VariantData = {
  wildType: string;
  alternativeSequence: string;
  ftId: string;
  begin: number;
  end: number;
  sourceType: string;
  description: string;

  // association: (3) [{…}, {…}, {…}]
  // clinicalSignificances: "Not provided,Benign,Likely benign,Benign/likely benign,Unclassified"
  // consequenceType: "missense"
  // cytogeneticBand: "1q42.13"
  // description: "[LSS_CLINVAR]: Early-Onset Familial Alzheimer Disease, Dilated Cardiomyopathy, Dominant [SWP]: uncertain pathological significance"
  // evidences: (2) [{…}, {…}]
  // genomicLocation: "NC_000001.11:g.226883748G>A"
  // polyphenPrediction: "benign"
  // polyphenScore: 0.003
  // siftPrediction: "tolerated"
  // siftScore: 0.11
  // somaticStatus: 0
  // type: "VARIANT"
  // xrefs: (5) [{…}, {…}, {…}, {…}, {…}]
};

export type VariationData = {
  sequence: string;
  features: VariantData[];
};

interface ProtvistaVariation extends Element {
  length: number;
  data: {
    sequence: string;
    variants: any[];
  };
}

interface ProtvistaDatatable extends Element {
  columns: any;
  data: any[];
}

export const loadWebComponent = (name: string, className: Function) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

const processVariantData = (variantData: VariantData[]) =>
  variantData.map(variant => {
    return {
      accession: variant.ftId,
      variant: variant.alternativeSequence,
      start: variant.begin,
      end: variant.end
    };
  });

const columns = {
  type: {
    label: "Type",
    resolver: (d: VariantData) => d.ftId
  },
  positions: {
    label: "Positions",
    resolver: (d: VariantData) => {
      return `${d.begin}-${d.end}`;
    }
  },
  change: {
    label: "Change",
    resolver: (d: VariantData) => {
      return `${d.wildType}->${d.alternativeSequence}`;
    }
  },
  description: {
    label: "Description",
    resolver: (d: VariantData) => d.description
  }
};

const VariantCard: FunctionComponent<{ data: VariationData }> = ({ data }) => {
  const id = v1();

  useEffect(() => {
    const protvistaVariation = document.querySelector<ProtvistaVariation>(
      `[data-uuid='${id}_var']`
    );
    const protvistaDatatable = document.querySelector<ProtvistaDatatable>(
      `[data-uuid='${id}_table']`
    );
    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: data.sequence,
        variants: processVariantData(data.features)
      };
    }
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns;
      console.log(data);
      protvistaDatatable.data = data.features;
    }
  }, []);

  loadWebComponent("protvista-sequence", ProtvistaSequence);
  loadWebComponent("protvista-manager", ProtvistaManager);
  loadWebComponent("protvista-navigation", ProtvistaNavigation);
  loadWebComponent("protvista-variation", ProtvistaVariation);
  loadWebComponent("protvista-datatable", ProtvistaDatatable);
  return (
    <Card title="Variants">
      <protvista-manager attributes="displaystart displayend highlight">
        <protvista-navigation
          data-uuid={`${id}_nav`}
          length={data.sequence.length}
        />
        <protvista-sequence
          data-uuid={`${id}_seq`}
          sequence={data.sequence}
          length={data.sequence.length}
        />
        <protvista-variation
          data-uuid={`${id}_var`}
          length={data.sequence.length}
        />
        <protvista-datatable data-uuid={`${id}_table`} />
      </protvista-manager>
    </Card>
  );
};

export default VariantCard;
