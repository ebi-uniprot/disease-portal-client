import React, { FunctionComponent } from "react";
import { Card } from "franklin-sites";
import { ProteinData } from "./ProteinCard";
import { getProteinLink } from "../utils";
import { withRouter, RouteComponentProps } from "react-router";

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateProteinLinks = (proteinItem: ProteinData, diseaseId: string) => {
  const proteinLinks = [];
  const { accession } = proteinItem;
  if (proteinItem.interactions && proteinItem.interactions.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "interaction",
        proteinItem.interactions.length
      )
    );
  }
  if (proteinItem.pathways && proteinItem.pathways.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "pathway",
        proteinItem.pathways.length
      )
    );
  }
  if (proteinItem.variants && proteinItem.variants.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "variant",
        proteinItem.variants.length
      )
    );
  }
  if (proteinItem.diseases && proteinItem.diseases.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "disease",
        proteinItem.diseases.length
      )
    );
  }
  if (proteinItem.drugs && proteinItem.drugs.length > 0) {
    proteinLinks.push(
      getProteinLink(diseaseId, accession, "drug", proteinItem.drugs.length)
    );
  }
  return proteinLinks;
};

const ProteinCardCompact: FunctionComponent<
  {
    data: ProteinData;
    diseaseId: string;
    selectedProteinId: string;
  } & RouteComponentProps
> = ({ data, diseaseId, selectedProteinId, history }) => {
  const { accession } = data;
  return (
    <Card
      links={generateProteinLinks(data, diseaseId)}
      key={data.proteinId}
      onClick={(s: any) =>
        history.push(`/disease/${diseaseId}/proteins/${accession}/protein`)
      }
      active={accession === selectedProteinId}
    >
      <h5>
        <a
          href={`//www.uniprot.org/uniprot/${data.accession}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.accession}
        </a>
        {" • "}
        {data.proteinId}
        {!data.isExternallyMapped ? (
          <span
            className="label label__reviewed"
            title="Disease association source: UniProt"
          >
            UniProt
          </span>
        ) : (
          <span
            className="label label__manual"
            title="Disease association source: Imported"
          >
            Imported
          </span>
        )}
      </h5>
      {data.proteinName} {" • "}
      <strong>Gene:</strong> {data.gene}
    </Card>
  );
};

export default withRouter(ProteinCardCompact);
