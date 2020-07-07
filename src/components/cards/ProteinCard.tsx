import React, { FunctionComponent, Fragment, useState } from "react";
import { v1 } from "uuid";
import { Card } from "franklin-sites";

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
  const [showWholeFunction, setShowWholeFunction] = useState(false);

  const diseaseNotes =
    data.diseases &&
    data.diseases.filter((disease) => disease.diseaseName === id);

  return (
    <Card>
      <h4>
        {data.gene} - {data.proteinName}{" "}
        <small>
          <a
            href={`//www.uniprot.org/uniprot/${data.accession}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.accession}
          </a>
        </small>
      </h4>

      {!data.isExternallyMapped ? (
        <span className="label label__reviewed">
          Disease association source: UniProt
        </span>
      ) : (
        <span className="label label__manual">
          Disease association source: Imported
        </span>
      )}
      <h5>Function</h5>
      <p>
        {!showWholeFunction && data.description.length > 200 ? (
          <Fragment>
            <span>{data.description.substring(0, 197)}... </span>
            <button onClick={() => setShowWholeFunction(true)}>more</button>
          </Fragment>
        ) : (
          data.description
        )}
      </p>
      {data.geneCoordinates && (
        <div>
          <h5>Gene information</h5>
          {data.geneCoordinates.map((coordinate) => (
            <p key={v1()}>
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
            </p>
          ))}
        </div>
      )}
      {diseaseNotes && (
        <Fragment>
          {diseaseNotes.length > 0 && <h5>Disease notes</h5>}
          {diseaseNotes.map((note) => (
            <Fragment key={v1()}>
              <h5>{note.diseaseName}</h5>
              <p>{note.note}</p>
            </Fragment>
          ))}
        </Fragment>
      )}
    </Card>
  );
};

export default ProteinCard;
