import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { html } from "lit-html";
import ProtvistaVariation from "protvista-variation";
import ProtvistaManager from "protvista-manager";
import ProtvistaSequence from "protvista-sequence";
import ProtvistaNavigation from "protvista-navigation";
import ProtvistaDatatable from "protvista-datatable";
import ProtvistaFilter from "protvista-filter";
import { v1 } from "uuid";
import { Card } from "franklin-sites";
import "./VariantCard.css";

type Evidence = {
  source: {
    name: string;
    id: string;
    url?: string;
    alternativeUrl?: string;
  };
};

export type VariantData = {
  wildType: string;
  alternativeSequence: string;
  ftId: string;
  begin: number;
  end: number;
  sourceType: string;
  description: string;
  association: { name: string; evidences?: Evidence[] }[];
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
      end: variant.end,
      association: variant.association
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
      return d.begin === d.end ? d.begin : `${d.begin}-${d.end}`;
    }
  },
  change: {
    label: "Change",
    resolver: (d: VariantData) => {
      return `
        ${d.wildType}->${d.alternativeSequence}
      `;
    }
  },
  association: {
    label: "Disease association",
    resolver: (d: VariantData) =>
      d.association
        ? d.association.map(
            association =>
              html`
                <p>
                  <strong>${association.name}</strong>${association.evidences &&
                    association.evidences.map(ev =>
                      ev.source.url
                        ? html`
                            <a href=${ev.source.url} target="_blank"
                              >${ev.source.name}:${ev.source.id}</a
                            >
                          `
                        : html`
                            ${ev.source.name}:${ev.source.id}
                          `
                    )}
                </p>
              `
          )
        : " - "
  }
};

const getDiseaseListForFeatures = (features: VariantData[]) => {
  const diseaseSet = new Set();
  features.forEach(
    variant =>
      variant.association &&
      variant.association.forEach(association =>
        diseaseSet.add(association.name)
      )
  );
  return diseaseSet;
};

const getFilters = (data: VariantData[]) => {
  const diseases = getDiseaseListForFeatures(data);

  return Array.from(diseases).map(diseaseName => {
    return {
      name: diseaseName,
      type: { name: "diseases", text: "Disease" },
      options: { labels: [diseaseName], colors: ["#A31D5F"] }
    };
  });
};

const VariantCard: FunctionComponent<{ data: VariationData }> = ({ data }) => {
  const id = v1();
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const diseases = getFilters(data.features);

  const _handleEvent = (e: ChangeEvent) => {
    if (e.detail && e.detail.type === "activefilters") {
      setActiveFilters(e.detail.value.map(d => d.substring(9)));
    }
  };

  useEffect(() => {
    const protvistaManager = document.querySelector<ProtvistaManager>(
      `[data-uuid='${id}_manager']`
    );
    if (protvistaManager) {
      protvistaManager.addEventListener("change", _handleEvent);
    }
  }, []);

  useEffect(() => {
    let filteredData;
    if (activeFilters.length > 0) {
      filteredData = data.features.filter(feature => {
        if (!feature.association) {
          return;
        }
        return feature.association.some(diseaseName =>
          activeFilters.includes(diseaseName.name)
        );
      });
    } else {
      filteredData = data.features;
    }

    const protvistaFilter = document.querySelector<ProtvistaFilter>(
      `[data-uuid='${id}_filter']`
    );

    const protvistaVariation = document.querySelector<ProtvistaVariation>(
      `[data-uuid='${id}_var']`
    );
    const protvistaDatatable = document.querySelector<ProtvistaDatatable>(
      `[data-uuid='${id}_table']`
    );

    if (protvistaFilter) {
      protvistaFilter.filters = diseases;
    }

    if (protvistaVariation) {
      protvistaVariation.data = {
        sequence: data.sequence,
        variants: processVariantData(filteredData)
      };
    }
    if (protvistaDatatable) {
      protvistaDatatable.columns = columns;
      protvistaDatatable.data = filteredData;
    }
  }, [activeFilters]);

  loadWebComponent("protvista-sequence", ProtvistaSequence);
  loadWebComponent("protvista-manager", ProtvistaManager);
  loadWebComponent("protvista-navigation", ProtvistaNavigation);
  loadWebComponent("protvista-variation", ProtvistaVariation);
  loadWebComponent("protvista-datatable", ProtvistaDatatable);
  loadWebComponent("protvista-filter", ProtvistaFilter);
  return (
    <Card title="Variants">
      <div className="protvista-grid">
        <protvista-manager
          attributes="displaystart displayend highlight"
          data-uuid={`${id}_manager`}
        >
          <protvista-navigation
            data-uuid={`${id}_nav`}
            length={data.sequence.length}
          />
          <protvista-sequence
            data-uuid={`${id}_seq`}
            sequence={data.sequence}
            length={data.sequence.length}
          />
          <protvista-filter data-uuid={`${id}_filter`} />
          <protvista-variation
            data-uuid={`${id}_var`}
            length={data.sequence.length}
          />
          <protvista-datatable height="20" data-uuid={`${id}_table`} />
        </protvista-manager>
      </div>
    </Card>
  );
};

export default VariantCard;
