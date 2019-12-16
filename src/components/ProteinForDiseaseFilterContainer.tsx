import React, { useState, FC } from "react";
import { v1 } from "uuid";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";

enum Filters {
  INT = "interactions",
  PAT = "pathways",
  DRU = "drugs",
  SEQ = "variants"
}

const ProteinForDiseaseFilterContainer: FC<{ data: any; id: string }> = ({
  data,
  id
}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    [Filters.INT]: false,
    [Filters.PAT]: false,
    [Filters.DRU]: false,
    [Filters.SEQ]: false
  });

  const handleFilterClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.checked
    });
  };

  const appliedFilters = Object.keys(selectedFilters).filter(
    f => selectedFilters[(f as unknown) as Filters]
  );

  const filteredData = data.filter((protein: ProteinData) =>
    appliedFilters.every(filter => {
      const items = protein[(filter as unknown) as Filters];
      return items && items.length > 0;
    })
  );

  return (
    <div>
      Only proteins with ({filteredData.length}
      ):
      {Object.keys(Filters).map(filterKey => (
        <label
          key={filterKey}
          style={{ display: "inline-block", marginLeft: "1rem" }}
        >
          <input
            type="checkbox"
            onChange={e => handleFilterClick(e)}
            checked={
              selectedFilters[Filters[filterKey as keyof typeof Filters]]
            }
            name={Filters[filterKey as keyof typeof Filters]}
          />{" "}
          {Filters[filterKey as keyof typeof Filters]}
        </label>
      ))}
      {filteredData &&
        filteredData.map((item: ProteinData) => (
          <ProteinCard data={item} id={id} key={v1()} />
        ))}
    </div>
  );
};

export default ProteinForDiseaseFilterContainer;
