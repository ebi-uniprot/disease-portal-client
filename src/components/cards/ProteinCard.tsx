import React, { FunctionComponent, Fragment } from "react";
import { Card } from "franklin-sites";
import { formatTextWithPubmeds } from "../../utils";
import OrthologuesForProteinContainer from "../OrthologuesForProteinContainer";

export type ProteinData = {
  proteinId: string;
  proteinName: string;
  accession: string;
  isExternallyMapped: boolean;
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
  drugs?: string[];
  diseases?: { diseaseName: string; note: string }[];
  pathways?: string[];
  interactions?: string[];
  variants?: string[];
};

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProteinCard: FunctionComponent<{ data: ProteinData; id: string }> = ({
  data,
  id,
}) => {
  const diseaseNotes =
    data.diseases &&
    data.diseases.filter((disease) => disease.diseaseName === id);

  return (
    <Card>
      <h4>
        <a
          href={`//www.uniprot.org/uniprot/${data.accession}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.accession}
        </a>
        {" • "}
        {data.proteinId}
      </h4>
      <section>
        <h5>Gene</h5> {data.gene}
        {data.geneCoordinates &&
          data.geneCoordinates.map((coordinate) => (
            <section key={coordinate.ensemblGeneId}>
              {coordinate.chromosome}:{formatLargeNumber(coordinate.start)}-
              {formatLargeNumber(coordinate.end)}{" "}
              <a
                href={`//www.ensembl.org/id/${coordinate.ensemblGeneId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coordinate.ensemblGeneId}
              </a>{" "}
              <a
                href={`//www.ensembl.org/id/${coordinate.ensemblTranscriptId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coordinate.ensemblTranscriptId}
              </a>{" "}
              <a
                href={`//www.ensembl.org/id/${coordinate.ensemblTranslationId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {coordinate.ensemblTranslationId}
              </a>
            </section>
          ))}
      </section>
      <section>
        <h5>Protein name</h5> {data.proteinName}
      </section>
      {/* isExternallyMapped not returned by API */}
      {/* {data.isExternallyMapped ? (
        <span className="label label__manual">
          Disease association source: Imported
        </span>
      ) : (
        <span className="label label__reviewed">
          Disease association source: UniProt
        </span>
      )} */}
      <h5>Function</h5>
      <p
        dangerouslySetInnerHTML={{
          __html: formatTextWithPubmeds(data.description),
        }}
      ></p>
      {diseaseNotes && (
        <Fragment>
          {diseaseNotes.length > 0 && <h5>Disease notes</h5>}
          {diseaseNotes.map((note) => (
            <Fragment key={note.note}>
              <h5>{note.diseaseName}</h5>
              <p>{note.note}</p>
            </Fragment>
          ))}
        </Fragment>
      )}
      <OrthologuesForProteinContainer id={id} />
    </Card>
  );
};

export default ProteinCard;
