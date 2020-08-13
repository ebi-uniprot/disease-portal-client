import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { html } from "lit-html";
import { v1 } from "uuid";
import { Card } from "franklin-sites";

import ProtvistaVariation from "protvista-variation";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaDatatable from "protvista-datatable";
import ProtvistaFilter from "protvista-filter";

import "./VariantCard.css";

type Evidence = {
  source: {
    name: string;
    id: string;
    url?: string;
    alternativeUrl?: string;
  };
};

type Xref = {
  name: string;
  url: string;
  id: string;
};

export type VariantData = {
  wildType: string;
  alternativeSequence: string;
  ftId: string;
  begin: number;
  end: number;
  sourceType: string;
  description: string;
  genomicLocation?: string;
  frequency?: string;
  association: { name: string; evidences?: Evidence[] }[];
  xrefs?: Xref[];
  polyphenPrediction?: string;
  polyphenScore?: number;
  siftPrediction?: string;
  siftScore?: number;
  cytogeneticBand?: string;
  consequenceType?: string;
};

export type VariationData = {
  sequence: string;
  features: VariantData[];
};

interface ProtvistaManager extends Element {}

interface ProtvistaVariation extends Element {
  length: number;
  data: {
    sequence: string;
    variants: any[];
  };
}

interface ProtvistaFilter extends Element {
  filters: {
    name: string;
    type: {
      name: string;
      text: string;
    };
    options: {
      labels: string[];
      colors: string[];
    };
  }[];
}

interface ChangeEvent extends Event {
  detail?: { type: string; value: string[] };
}

export interface ProtvistaDatatableType extends Element {
  columns: any;
  data: any[];
}

export const loadWebComponent = (
  name: string,
  className: CustomElementConstructor
) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, className);
  }
};

loadWebComponent("protvista-sequence", ProtvistaSequence);
loadWebComponent("protvista-manager", ProtvistaManager);
loadWebComponent("protvista-navigation", ProtvistaNavigation);
loadWebComponent("protvista-variation", ProtvistaVariation);
loadWebComponent("protvista-datatable", ProtvistaDatatable);
loadWebComponent("protvista-filter", ProtvistaFilter);

const colours = {
  diseaseColour: "#A31D5F",
  other: "#00a6d5",
};

const getColour = (variant: VariantData) => {
  if (variant.association) {
    return colours.diseaseColour;
  } else {
    return colours.other;
  }
};

const processVariantData = (variantData: VariantData[]) =>
  variantData.map((variant) => {
    return {
      accession: variant.ftId,
      protvistaFeatureId: variant.ftId,
      variant: variant.alternativeSequence,
      start: variant.begin,
      end: variant.end,
      association: variant.association,
      color: getColour(variant),
    };
  });

const columns = {
  type: {
    label: "ID",
    resolver: (d: VariantData) => d.ftId,
  },
  positions: {
    label: "Positions",
    resolver: (d: VariantData) => {
      return d.begin === d.end ? d.begin : `${d.begin}-${d.end}`;
    },
  },
  change: {
    label: "Change",
    resolver: (d: VariantData) => {
      return `
        ${d.wildType}->${d.alternativeSequence}
      `;
    },
  },
  description: {
    label: "Description",
    resolver: (d: VariantData) => {
      return d.description;
    },
  },
  genomicLocation: {
    label: "Genomic location",
    resolver: (d: VariantData) => d.genomicLocation,
  },
  frequency: {
    label: "Frequency",
    resolver: (d: VariantData) => d.frequency,
  },
  rsId: {
    label: "IDs",
    resolver: (d: VariantData) => d.xrefs?.map(({ id }) => id).join(", "),
    child: true,
  },
  association: {
    label: "Disease association",
    resolver: (d: VariantData) =>
      d.association
        ? d.association.map(
            (association) =>
              html`
                <p>
                  <strong>${association.name}</strong>${association.evidences &&
                  association.evidences.map((ev) =>
                    ev.source.url
                      ? html`
                          <a href=${ev.source.url} target="_blank"
                            >${ev.source.name}:${ev.source.id}</a
                          >
                        `
                      : html` ${ev.source.name}:${ev.source.id} `
                  )}
                </p>
              `
          )
        : " - ",
  },
};

const getDiseaseListForFeatures = (features: VariantData[]) => {
  const diseaseSet = new Set();
  features.forEach(
    (variant) =>
      variant.association &&
      variant.association.forEach((association) =>
        diseaseSet.add(association.name)
      )
  );
  return diseaseSet;
};

const VariantCard: FunctionComponent<{
  data: VariationData;
  accession: string;
}> = ({ data, accession }) => {
  const idRef = useRef(v1());
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const getFilters = (data: VariantData[]) => {
    const diseases = getDiseaseListForFeatures(data);

    return Array.from(diseases).map((diseaseName) => {
      return {
        name: diseaseName as string,
        type: { name: "diseases", text: "Disease" },
        options: {
          labels: [diseaseName as string],
          colors: [colours.diseaseColour],
        },
        filterData: (variants: any) =>
          variants.map((variantPosition: any) => ({
            ...variantPosition,
            variants: variantPosition.variants.filter(
              (variant: VariantData) => {
                if (!variant.association) {
                  return null;
                }
                return variant.association.some(
                  (varantDiseaseName) => varantDiseaseName.name === diseaseName
                );
              }
            ),
          })),
      };
    });
  };

  const diseaseFilter = getFilters(data.features);

  const _handleEvent = (e: ChangeEvent) => {
    if (e.detail && e.detail.type === "change") {
      setActiveFilters(e.detail.value.map((d) => d.substring(9)));
    }
  };

  useEffect(() => {
    const protvistaManager = document.querySelector<ProtvistaManager>(
      `[data-uuid='${idRef.current}_manager']`
    );
    if (protvistaManager) {
      protvistaManager.addEventListener("change", _handleEvent);
    }
  }, []);

  useEffect(() => {
    let filteredData;
    if (activeFilters.length > 0) {
      filteredData = data.features.filter((feature) => {
        if (!feature.association) {
          return null;
        }
        return feature.association.some((diseaseName) =>
          activeFilters.includes(diseaseName.name)
        );
      });
    } else {
      filteredData = data.features;
    }

    const protvistaFilter = document.querySelector<ProtvistaFilter>(
      `[data-uuid='${idRef.current}_filter']`
    );

    const protvistaVariation = document.querySelector<ProtvistaVariation>(
      `[data-uuid='${idRef.current}_var']`
    );
    const protvistaDatatable = document.querySelector<ProtvistaDatatableType>(
      `[data-uuid='${idRef.current}_table']`
    );

    if (protvistaFilter) {
      protvistaFilter.filters = diseaseFilter;
    }

    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: data.sequence,
        variants: processVariantData(filteredData),
      };
    }
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns;
      protvistaDatatable.data = filteredData.map((d) => ({
        ...d,
        protvistaFeatureId: d.ftId,
      }));
    }
  }, [activeFilters, data.features, data.sequence, diseaseFilter]);

  if (!data.sequence) {
    return null;
  }

  return (
    <Card>
      <div className="protvista-grid">
        <protvista-manager
          attributes="displaystart displayend highlight selectedid"
          data-uuid={`${idRef.current}_manager`}
        >
          <protvista-navigation
            data-uuid={`${idRef.current}_nav`}
            length={data.sequence.length}
          />
          <section className="protvista-filter-section">
            <h5>Filter</h5>
            <protvista-filter
              data-uuid={`${idRef.current}_filter`}
              for="protvista-variation"
            />
          </section>
          <protvista-variation
            data-uuid={`${idRef.current}_var`}
            id="protvista-variation"
            height="260"
            length={data.sequence.length}
            displaystart={1}
            displayend={data.sequence.length}
          />
          <section className="protvista-button-section">
            <a
              className="button"
              href={`//www.uniprot.org/uniprot/${accession}/protvista`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View all sequence annotation
            </a>
          </section>
          <protvista-datatable
            height="30"
            data-uuid={`${idRef.current}_table`}
          />
        </protvista-manager>
      </div>
    </Card>
  );
};

export default VariantCard;
