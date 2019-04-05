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
  geneCoordinates?: [
    {
      chromosome: string;
      start: number;
      end: number;
      ensemblGeneId: string;
      ensemblTranscriptId: string;
      ensemblTranslationId: string;
    }
  ];
  xrefs?: string[];
  interactions?: string[];
  diseases?: string[];
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateProteinLinks = (proteinItem: ProteinData) => {
  console.log(proteinItem);
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
    <p>{data.description}</p>
    {data.geneCoordinates && (
      <div>
        <h4>Gene information</h4>
        {data.geneCoordinates.map(coordinate => (
          <p key={coordinate.start + coordinate.end}>
            {coordinate.chromosome}:{formatLargeNumber(coordinate.start)}-
            {formatLargeNumber(coordinate.end)}{" "}
            <a
              href={`//www.ensembl.org/id/${coordinate.ensemblGeneId}`}
              target="_blank"
            >
              {coordinate.ensemblGeneId}
            </a>{" "}
            <a
              href={`//www.ensembl.org/id/${coordinate.ensemblTranscriptId}`}
              target="_blank"
            >
              {coordinate.ensemblTranscriptId}
            </a>{" "}
            <a
              href={`//www.ensembl.org/id/${coordinate.ensemblTranslationId}`}
              target="_blank"
            >
              {coordinate.ensemblTranslationId}
            </a>
          </p>
        ))}
      </div>
    )}
  </Card>
);

export default ProteinCard;
