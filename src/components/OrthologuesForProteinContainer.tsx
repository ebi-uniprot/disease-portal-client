import React, { FC } from "react";

import useApi from "./hooks/UseApi";
import { featuresForProteinUrl, orthologuesForProteinUrl } from "../urls";
import OrthologuesCard, { OrthologuesAPI } from "./cards/OrthologuesCard";

const OrthologuesForProteinContainer: FC<{ id: string }> = ({ id }) => {
  const { data } = useApi<OrthologuesAPI>(orthologuesForProteinUrl(id));
  const { data: featuresData } = useApi<any>(featuresForProteinUrl(id));
  if (!data || !featuresData) {
    return null;
  }
  return <OrthologuesCard data={data} sequence={featuresData.sequence} />;
};

export default OrthologuesForProteinContainer;
