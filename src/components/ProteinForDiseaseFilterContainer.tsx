import React, { useState, FC } from "react";
import { v1 } from "uuid";
import { ProteinData } from "./cards/ProteinCard";
import ProteinCardCompact from "./cards/ProteinCardCompact";

enum Filters {
  INT = "interactions",
  PAT = "pathways",
  DRU = "drugs",
  SEQ = "variants",
}

const ProteinForDiseaseFilterContainer: FC<{
  data: any;
  diseaseId: string;
  selectedProteinId: string;
}> = ({ data, diseaseId, selectedProteinId }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    [Filters.INT]: false,
    [Filters.PAT]: false,
    [Filters.DRU]: false,
    [Filters.SEQ]: false,
  });

  const handleFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.checked,
    });
  };

  const appliedFilters = Object.keys(selectedFilters).filter(
    (f) => selectedFilters[(f as unknown) as Filters]
  );

  const filteredData = data.filter((protein: ProteinData) =>
    appliedFilters.every((filter) => {
      const items = protein[(filter as unknown) as Filters];
      return items && items.length > 0;
    })
  );

  return (
    <section>
      <section className="page-header">
        <h5>{filteredData.length} proteins</h5>
        <section className="filter-row">
          <strong>Filter:</strong>
          {Object.keys(Filters).map((filterKey) => (
            <label
              key={filterKey}
              style={{ display: "inline-block", marginLeft: "1rem" }}
            >
              <input
                type="checkbox"
                onChange={(e) => handleFilterClick(e)}
                checked={
                  selectedFilters[Filters[filterKey as keyof typeof Filters]]
                }
                name={Filters[filterKey as keyof typeof Filters]}
              />{" "}
              {Filters[filterKey as keyof typeof Filters]}
            </label>
          ))}
        </section>
      </section>
      {filteredData &&
        filteredData.map((item: ProteinData) => (
          <ProteinCardCompact
            data={item}
            diseaseId={diseaseId}
            key={v1()}
            selectedProteinId={selectedProteinId ? selectedProteinId : data[0]}
          />
        ))}
    </section>
  );
};

export default ProteinForDiseaseFilterContainer;
