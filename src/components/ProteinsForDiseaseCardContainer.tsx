import React, { useState } from "react";
import { v1 } from "uuid";
import { DropdownButton } from "franklin-sites";
import { ProteinData } from "./cards/ProteinCard";
import ProteinCardCompact from "./cards/ProteinCardCompact";
import Axios from "axios";
import { baseUrl } from "../config";
import { useParams } from "react-router";
import UseApi from "./hooks/UseApi";

enum Filters {
  INT = "interactions",
  PAT = "pathways",
  DRU = "drugs",
  SEQ = "variants",
}

const ProteinForDiseaseCardContainer = () => {
  const { diseaseid, proteinid } = useParams();
  const [selectedFilters, setSelectedFilters] = useState({
    [Filters.INT]: false,
    [Filters.PAT]: false,
    [Filters.DRU]: false,
    [Filters.SEQ]: false,
  });

  const { data } = UseApi<{ results: ProteinData[] }>(
    `${baseUrl}/disease/${diseaseid}/proteins`
  );

  if (!data) {
    return null;
  }

  const { results } = data;

  const sortedData = results.sort(
    (a: ProteinData, b: ProteinData) => (b.isExternallyMapped ? 1 : 0) && -1
  );

  const downloadProteins = (proteinIds: string[]) => {
    const url = `${baseUrl}/proteins/${proteinIds.join(",")}/download`;
    Axios({
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

  const appliedFilters = Object.keys(selectedFilters).filter(
    (f) => selectedFilters[(f as unknown) as Filters]
  );

  const filteredData = sortedData.filter((protein: ProteinData) =>
    appliedFilters.every((filter) => {
      const items = protein[(filter as unknown) as Filters];
      return items && items.length > 0;
    })
  );

  return (
    <section>
      <section className="page-header">
        <h5>{filteredData.length} proteins</h5>
        <section className="button-group">
          <DropdownButton label="Filter" className="tertiary">
            <ul className="no-bullet">
              {Object.keys(Filters).map((filterKey) => (
                <li key={filterKey}>
                  <label>
                    <input
                      type="checkbox"
                      onChange={(e) => handleFilterClick(e)}
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
                  filteredData.map((protein: ProteinData) => protein.accession)
                )
              }
            >
              Download
            </button>
          )}
        </section>
      </section>
      {filteredData &&
        filteredData.map((item: ProteinData) => (
          <ProteinCardCompact
            data={item}
            diseaseId={diseaseid}
            key={v1()}
            selectedProteinId={proteinid ? proteinid : sortedData[0]}
          />
        ))}
    </section>
  );
};

export default ProteinForDiseaseCardContainer;
