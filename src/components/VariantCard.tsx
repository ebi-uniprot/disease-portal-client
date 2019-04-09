import React, { FunctionComponent, useEffect } from "react";
import ProtvistaVariation from "protvista-variation";
import { Card } from "franklin-sites";

type VariantData = {
  alternativeSequence: string;
  featureId: string;
  report: string;
  featureStatus: string;
  begin: number;
  end: number;
};

export type VariationData = {
  sequence: string;
  features: VariantData[];
};

interface ProtvistaVariation extends Element {
  data: {
    sequence: string;
    variants: any[];
  };
}

export const loadWebComponent = (name: string, className: Function) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

const processVariantData = (variantData: VariantData[]) =>
  variantData.map(variant => {
    return {
      accession: variant.featureId,
      variant: variant.alternativeSequence,
      start: variant.begin,
      end: variant.end
    };
  });

const VariantCard: FunctionComponent<{ data: VariationData }> = ({ data }) => {
  useEffect(() => {
    const protvistaVariation = document.querySelector<ProtvistaVariation>(
      "protvista-variation"
    );
    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: data.sequence,
        variants: processVariantData(data.features)
      };
    }
  }, []);

  loadWebComponent("protvista-variation", ProtvistaVariation);
  return (
    <Card title="Variants">
      <protvista-variation length="770" />
    </Card>
  );
};

export default VariantCard;
