import React, { useState } from "react";
import { useParams } from "react-router";
import { DropdownButton } from "franklin-sites";
import axios from "axios";

import { ProteinData } from "./cards/ProteinCard";
import ProteinCardCompact from "./cards/ProteinCardCompact";
import { baseUrl } from "../config";
import UseApi from "./hooks/UseApi";
import { proteinsForDiseaseUrl } from "../urls";

enum Filters {
  INT = "interactions",
  PAT = "pathways",
  DRU = "drugs",
  SEQ = "variants",
}

const sortExternallyMappedLast = (a: ProteinData, b: ProteinData) =>
  // externally mapped last
  +a.isExternallyMapped - +b.isExternallyMapped ||
  // then, order alphabetically (just to have something consistent)
  a.accession.localeCompare(b.accession);

const ProteinForDiseaseCardContainer = () => {
  const { diseaseid, proteinid } = useParams();
  const [selectedFilters, setSelectedFilters] = useState({
    [Filters.INT]: false,
    [Filters.PAT]: false,
    [Filters.DRU]: false,
    [Filters.SEQ]: false,
  });

  const { data } = UseApi<{ results: ProteinData[] }>(
    proteinsForDiseaseUrl(diseaseid)
  );

  if (!data) {
    return null;
  }

  const { results } = data;

  const sortedData = Array.from(results).sort(sortExternallyMappedLast);

  const downloadProteins = (proteinIds: string[]) => {
    // TODO: check, not working
    const url = `${baseUrl}/proteins/${proteinIds.join(",")}/download`;
    axios({
      url: url,
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ad-prototype.csv");
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.checked,
    });
  };

  const appliedFilters = (Object.keys(selectedFilters) as Array<
    keyof typeof selectedFilters
  >).filter((f) => selectedFilters[f]);

  const filteredData = sortedData.filter((protein: ProteinData) =>
    appliedFilters.every((filter) => {
      const items = protein[filter];
      return items && items.length > 0;
    })
  );

  return (
    <section>
      <section className="page-header">
        <h4>{filteredData.length} proteins</h4>
        <section className="button-group">
          <DropdownButton label="Filter" className="tertiary">
            <ul className="no-bullet">
              {Object.keys(Filters).map((filterKey) => (
                <li key={filterKey}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={handleFilterClick}
                      checked={
                        selectedFilters[
                          Filters[filterKey as keyof typeof Filters]
                        ]
                      }
                      name={Filters[filterKey as keyof typeof Filters]}
                    />
                    {Filters[filterKey as keyof typeof Filters]}
                  </label>
                </li>
              ))}
            </ul>
          </DropdownButton>
          {filteredData && filteredData.length <= 300 && (
            <button
              className="button tertiary"
              type="button"
              onClick={() =>
                downloadProteins(
                  filteredData.map((protein) => protein.accession)
                )
              }
            >
              Download
            </button>
          )}
        </section>
      </section>
      {filteredData &&
        filteredData.map((item) => (
          <ProteinCardCompact
            data={item}
            diseaseId={diseaseid}
            key={item.accession}
            selectedProteinId={proteinid || sortedData[0]}
          />
        ))}
    </section>
  );
};

export default ProteinForDiseaseCardContainer;
