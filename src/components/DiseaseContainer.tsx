import React, { Fragment, FunctionComponent, FC } from "react";
import useApi from "./UseApi";
import DiseaseCard from "./cards/DiseaseCard";
import { baseUrl } from "../config";

const DiseaseContainer: FunctionComponent<{ id: string }> = ({ id }) => {
  const { data } = useApi(`${baseUrl}/diseases/${id}`);
  if (!data) {
    return null;
  }
  return (
    <Fragment>
      <div className="page-header">
        <h2>Disease</h2>
      </div>
      <DiseaseCard data={data.result} />
    </Fragment>
  );
};

export default DiseaseContainer;
