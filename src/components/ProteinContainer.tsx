import React, { Fragment, FunctionComponent, FC } from "react";
import useApi from "./UseApi";
import ProteinCard from "./cards/ProteinCard";

const ProteinContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/proteins/${id}`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>Protein</h2>
      </div>
      <ProteinCard data={data.result} id={id} />;
    </Fragment>
  );
};

export default ProteinContainer;
