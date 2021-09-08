import React, {
  FunctionComponent,
  useEffect,
  useState,
  useRef,
  useMemo,
  Fragment,
} from "react";
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
  Variant,
  Prediction,
} from "protvista-variation-adapter/dist/es/variants";

import "./VariantCard.css";
import { groupBy } from "lodash-es";
import { OrthologueMapping } from "./OrthologuesCard";

type VariantWithId = { protvistaFeatureId: string } & Variant;

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
    feature?: Variant | OrthologueMapping;
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
  return (
    <ul>
      {counts.map((countItem) => (
        <li key={countItem.algorithm}>
          <strong>{countItem.algorithm}</strong>{" "}
          {countItem.values.map((countValue) => countValue.name).join(", ")}
        </li>
      ))}
    </ul>
  );
};

const colours = {
  diseaseColour: "#A31D5F",
  other: "#00a6d5",
};

const getColour = (variant: Variant) => {
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

const getDiseaseListForFeatures = (features: Variant[]) => {
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

  const getFilters = (data: Variant[]) => {
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
            variants: variantPosition.variants.filter((variant: Variant) => {
              if (!variant.association) {
                return null;
              }
              return variant.association.some(
                (varantDiseaseName) => varantDiseaseName.name === diseaseName
              );
            }),
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

    if (protvistaFilter) {
      protvistaFilter.filters = diseaseFilter;
    }

    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: idData.sequence,
        variants: processVariantData(filteredData),
      };
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
          <protvista-datatable height="30">
            <table>
              <thead>
                <tr>
                  <th>Change</th>
                  <th>Positions</th>
                  <th>Description</th>
                  <th>IDs</th>
                  <th>Genomic location</th>
                </tr>
              </thead>
              <tbody>
                {idData.features.map((d) => (
                  <Fragment key={d.protvistaFeatureId}>
                    <tr
                      data-id={d.protvistaFeatureId}
                      data-start={d.begin}
                      data-end={d.begin}
                    >
                      <td>{`${d.wildType} -> ${d.alternativeSequence}`}</td>
                      <td>
                        {d.begin === d.end ? d.begin : `{d.begin}-{d.end}`}
                      </td>
                      <td>
                        {d.descriptions?.map((description) => (
                          <div key={description.value}>
                            {description.value} (
                            {description.sources.join(", ")})
                          </div>
                        ))}
                      </td>
                      <td>
                        {d.xrefs?.map(({ id, url }, i) => (
                          <div key={`${url}${i}`}>
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {id}
                              </a>
                            ) : (
                              id
                            )}
                          </div>
                        ))}
                      </td>
                      <td>{d.genomicLocation}</td>
                    </tr>
                    <tr data-group-for={d.protvistaFeatureId}>
                      <td>
                        {d.populationFrequencies && (
                          <div>
                            <strong>Population frequencies:</strong>
                            <ul>
                              {d.populationFrequencies.map((frequency) => (
                                <li key={frequency.populationName}>
                                  {frequency.populationName}
                                  {" - "}
                                  {frequency.frequency}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {d.predictions && (
                          <div>
                            <strong>Predictions:</strong>
                            {getPredictions(d.predictions)}
                          </div>
                        )}
                        {d.association && (
                          <div>
                            <strong>Disease association:</strong>
                            {d.association.map((association) => (
                              <div key={association.name}>
                                <strong>{association.name}</strong>:
                                {association.evidences?.map((ev) => (
                                  <span key={ev.source.id}>
                                    {ev.source.url ? (
                                      <a
                                        href={ev.source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {ev.source.name}:{ev.source.id}{" "}
                                      </a>
                                    ) : (
                                      `${ev.source.name} : ${ev.source.id}{' '}`
                                    )}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </protvista-datatable>
        </protvista-manager>
      </div>
    </Card>
  );
};

export default VariantCard;
