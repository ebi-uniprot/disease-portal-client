import React, { Fragment, FunctionComponent } from "react";
import { Card } from "franklin-sites";
import color from "../config.json";
import { Context } from "./CardContainer";

export type ProteinData = {
  proteinId: string;
  proteinName: string;
  accession: string;
  gene: string;
  description: string;
  xrefs?: string[];
  interactions?: string[];
  diseases?: string[];
};

const generateProteinLinks = (proteinItem: ProteinData) => {
  const proteinLinks = [];
  if (proteinItem.interactions && proteinItem.interactions.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.interactions.length} interaction${
        proteinItem.interactions.length > 1 ? "s" : ""
      }`,
      link: `/${Context.INTERACTION}/${proteinItem.accession}`,
      color: color.INTERACTION
    });
  }
  if (proteinItem.xrefs && proteinItem.xrefs.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.xrefs.length} pathway${
        proteinItem.xrefs.length > 1 ? "s" : ""
      }`,
      link: `/${Context.PATHWAY}/${proteinItem.accession}`,
      color: color.PATHWAY
    });
  }
  return proteinLinks;
};

const ProteinCard: FunctionComponent<{ data: ProteinData }> = ({ data }) => (
  <Card
    title={data.proteinName}
    links={generateProteinLinks(data)}
    key={data.proteinId}
  >
    {data.description}
  </Card>
);

export default ProteinCard;
