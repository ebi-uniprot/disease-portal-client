import React, { Fragment, FunctionComponent } from "react";
import useApi from "./UseApi";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";

const ProteinContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi<{ results: ProteinData }>(
    `${baseUrl}/proteins/${id}`
  );
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>Protein</h2>
      </div>
      <ProteinCard data={data?.results} id={id} />;
    </Fragment>
  );
};

export default ProteinContainer;
