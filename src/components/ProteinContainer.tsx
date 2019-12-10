import React, { Fragment, FunctionComponent, FC } from "react";
import useApi from "./UseApi";
import ProteinCard from "./cards/ProteinCard";
import { baseUrl } from "../config";

const ProteinContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi(`${baseUrl}/proteins/${id}`);
  console.log(data);
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
