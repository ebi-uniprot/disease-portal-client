import React, { useState, FC } from "react";
import { v1 } from "uuid";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";

enum Filters {
  INT = "interactions",
  PAT = "pathways",
  DRU = "drugs",
  SEQ = "variants",
  DIS = "diseases"
}

const ProteinForDiseaseFilterContainer: FC<{ data: any; id: string }> = ({
  data,
  id
}) => {
  const [selectedFilters, setSelectedFilters] = useState({
    [Filters.INT]: false,
    [Filters.PAT]: false,
    [Filters.DRU]: false,
    [Filters.SEQ]: false,
    [Filters.DIS]: false
  });

  const handleFilterClick = async e => {
    await setSelectedFilters({
      ...selectedFilters,
      [e.target.name]: e.target.checked
    });
  };

  const appliedFilters = Object.keys(selectedFilters).filter(
    f => selectedFilters[f]
  );

  const filteredData = data.filter((protein: ProteinData) =>
    appliedFilters.every(
      filter => protein[filter] && protein[filter].length > 0
    )
  );

  return (
    <div>
      Only proteins with:
      {Object.keys(Filters).map(filterKey => (
        <label
          key={filterKey}
          style={{ display: "inline-block", marginLeft: "1rem" }}
        >
          <input
            type="checkbox"
            onChange={e => handleFilterClick(e)}
            checked={selectedFilters[Filters[filterKey]]}
            name={Filters[filterKey]}
          />{" "}
          {Filters[filterKey]}
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
