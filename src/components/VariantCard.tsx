import React, { FunctionComponent, useEffect, useState } from "react";
import ProtvistaVariation from "protvista-variation";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import { v1 } from "uuid";
import { Card } from "franklin-sites";

export type VariantData = {
  alternativeSequence: string;
  featureId: string;
  report: string;
  featureStatus: string;
  begin: number;
  end: number;
  sourceType: string;
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
  const id = v1();

  useEffect(() => {
    const protvistaVariation = document.querySelector<ProtvistaVariation>(
      `[data-uuid='${id}_var']`
    );
    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: data.sequence,
        variants: processVariantData(data.features)
      };
    }
  }, []);

  loadWebComponent("protvista-sequence", ProtvistaSequence);
  loadWebComponent("protvista-manager", ProtvistaManager);
  loadWebComponent("protvista-navigation", ProtvistaNavigation);
  loadWebComponent("protvista-variation", ProtvistaVariation);
  return (
    <Card title="Variants">
      <protvista-manager attributes="displaystart displayend highlightstart highlightend">
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
      </protvista-manager>
    </Card>
  );
};

export default VariantCard;
