import React from "react";
import useApi from "./hooks/UseApi";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import { useParams } from "react-router";
import { proteinsUrl } from "../urls";

const ProteinContainer = () => {
  const { proteinid } = useParams();

  const { data } = useApi<{ result: ProteinData }>(proteinsUrl(proteinid));

  if (!data) {
    return null;
  }

  return <ProteinCard data={data?.result} id={proteinid} />;
};

export default ProteinContainer;
