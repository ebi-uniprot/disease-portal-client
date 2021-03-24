import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { html } from "lit-html";
import { v1 } from "uuid";
import { Card } from "franklin-sites";

import ProtvistaVariation from "protvista-variation";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaDatatable from "protvista-datatable";
import ProtvistaFilter from "protvista-filter";

import {
  ProteinsAPIVariation,
  Feature as VariantFeature,
  Prediction,
} from "protvista-variation-adapter/dist/es/variants";

import "./VariantCard.css";
import { groupBy } from "lodash-es";
import { OrthologueMapping } from "./OrthologuesCard";

type VariantWithId = { protvistaFeatureId: string } & VariantFeature;

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

export interface ChangeEvent extends Event {
  detail?: {
    type: string;
    value: string[];
    eventtype?: string;
    feature?: VariantFeature | OrthologueMapping;
    coords: number[];
  };
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

export const getPredictions = (predictions: Prediction[]) => {
  const groupedPredictions = groupBy(predictions, "predAlgorithmNameType");
  const counts = Object.keys(groupedPredictions).map((key) => {
    const valueGroups = groupBy(groupedPredictions[key], "predictionValType");
    return {
      algorithm: key,
      values: Object.keys(valueGroups).map((valKey) => ({
        name: valKey,
        count: valueGroups[valKey].length,
      })),
    };
  });
  return html`${counts.map(
    (countItem) =>
      html`<p>
        <strong>${countItem.algorithm}</strong> ${countItem.values.map(
          (countValue) => html`${countValue.name}<br />`
        )}
      </p>`
  )}`;
};

const colours = {
  diseaseColour: "#A31D5F",
  other: "#00a6d5",
};

const getColour = (variant: VariantFeature) => {
  if (variant.association) {
    return colours.diseaseColour;
  } else {
    return colours.other;
  }
};

const processVariantData = (variantData: VariantWithId[]) =>
  variantData.map((variant) => {
    return {
      accession: variant.ftId,
      protvistaFeatureId: variant.protvistaFeatureId,
      variant: variant.alternativeSequence ? variant.alternativeSequence : "-",
      start: variant.begin,
      end: variant.end,
      association: variant.association,
      color: getColour(variant),
    };
  });

const columns = {
  change: {
    label: "Change",
    resolver: (d: VariantFeature) => {
      return `
        ${d.wildType}->${d.alternativeSequence}
      `;
    },
  },
  positions: {
    label: "Positions",
    resolver: (d: VariantFeature) => {
      return d.begin === d.end ? d.begin : `${d.begin}-${d.end}`;
    },
  },
  description: {
    label: "Description",
    resolver: (d: VariantFeature) => {
      return d.descriptions?.map(
        (description) =>
          html`<p>${description.value} (${description.sources.join(", ")})</p>`
      );
    },
  },
  rsId: {
    label: "IDs",
    resolver: (d: VariantFeature) => {
      return html`${d.xrefs?.map(
        ({ id, url }) =>
          html`<p>
            ${url
              ? html`<a href="${url}" target="_blank" rel="noopener noreferrer"
                  >${id}</a
                >`
              : id}
          </p>`
      )}`;
    },
  },
  genomicLocation: {
    label: "Genomic location",
    resolver: (d: VariantFeature) => d.genomicLocation,
  },
  popFrequencey: {
    label: "Population frequencies",
    child: true,
    resolver: (d: VariantFeature) =>
      d.populationFrequencies?.map(
        (frequency) =>
          html`${frequency.populationName} - ${frequency.frequency}`
      ),
  },
  predictions: {
    label: "Predictions",
    child: true,
    resolver: (d: VariantFeature) =>
      d.predictions ? getPredictions(d.predictions) : "",
  },
  association: {
    label: "Disease association",
    child: "true",
    resolver: (d: VariantFeature) =>
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

const getDiseaseListForFeatures = (features: VariantFeature[]) => {
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
  data: ProteinsAPIVariation;
  accession: string;
}> = ({ data, accession }) => {
  const idRef = useRef(v1());
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const idData = useMemo(
    () => ({
      sequence: data.sequence,
      features: data.features.map((d) => ({ ...d, protvistaFeatureId: v1() })),
    }),
    [data]
  );

  const getFilters = (data: VariantFeature[]) => {
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
              (variant: VariantFeature) => {
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

  const diseaseFilter = getFilters(idData.features);

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
      filteredData = idData.features.filter((feature) => {
        if (!feature.association) {
          return null;
        }
        return feature.association.some((diseaseName) =>
          activeFilters.includes(diseaseName.name)
        );
      });
    } else {
      filteredData = idData.features;
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
        sequence: idData.sequence,
        variants: processVariantData(filteredData),
      };
    }
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns;
      protvistaDatatable.data = filteredData;
    }
  }, [activeFilters, data.features, data.sequence, diseaseFilter, idData]);

  if (!data.sequence) {
    return null;
  }

  return (
    <Card>
      <div className="variant-card">
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
