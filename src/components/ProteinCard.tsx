import React, { FunctionComponent, Fragment } from "react";
import { v1 } from "uuid";
import { Card } from "franklin-sites";
import color from "../config.json";
import { Context } from "../types/context";

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
  diseases?: { diseaseName: string; note: string }[];
  pathways?: string[];
  interactions?: string[];
  variants?: string[];
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateProteinLinks = (proteinItem: ProteinData) => {
  const proteinLinks = [];
  if (proteinItem.interactions && proteinItem.interactions.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.interactions.length} interaction${
        proteinItem.interactions.length > 1 ? "s" : ""
      }`,
      link: `/${Context.INTERACTION}/${proteinItem.accession}`,
      color: color.INTERACTION,
    });
  }
  if (proteinItem.pathways && proteinItem.pathways.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.pathways.length} pathway${
        proteinItem.pathways.length > 1 ? "s" : ""
      }`,
      link: `/${Context.PATHWAY}/${proteinItem.accession}`,
      color: color.PATHWAY,
    });
  }
  if (proteinItem.variants && proteinItem.variants.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.variants.length} variant${
        proteinItem.variants.length > 1 ? "s" : ""
      }`,
      link: `/${Context.VARIANT}/${proteinItem.accession}`,
      color: color.VARIANT,
    });
  }
  if (proteinItem.diseases && proteinItem.diseases.length > 0) {
    proteinLinks.push({
      name: `${proteinItem.diseases.length} disease${
        proteinItem.diseases.length > 1 ? "s" : ""
      }`,
      link: `/${Context.DISEASE}/${proteinItem.accession}`,
      color: color.DISEASE,
    });
  }
  return proteinLinks;
};

const ProteinCard: FunctionComponent<{ data: ProteinData; id: string }> = ({
  data,
  id,
}) => {
  const diseaseNotes =
    data.diseases &&
    data.diseases.filter(disease => disease.diseaseName === id);
  return (
    <Card
      title={
        <Fragment>
          {data.proteinName}{" "}
          <small>
            <a
              href={`//www.uniprot.org/uniprot/${data.accession}`}
              target="_blank"
            >
              {data.accession}
            </a>
          </small>
        </Fragment>
      }
      links={generateProteinLinks(data)}
      key={data.proteinId}
    >
      {diseaseNotes && (
        <Fragment>
          <h4>Disease notes</h4>
          {diseaseNotes.map(note => (
            <Fragment key={v1()}>
              <h5>{note.diseaseName}</h5>
              <p>{note.note}</p>
            </Fragment>
          ))}
        </Fragment>
      )}
      <h4>Function</h4>
      <p>{data.description}</p>
      {data.geneCoordinates && (
        <div>
          <h4>Gene information</h4>
          {data.geneCoordinates.map(coordinate => (
            <p key={v1()}>
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
};

export default ProteinCard;
