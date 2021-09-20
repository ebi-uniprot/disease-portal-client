import React, { FunctionComponent } from "react";
import { Card } from "franklin-sites";
import { ProteinData } from "./ProteinCard";
import { createLink } from "../utils";
import { useHistory } from "react-router";
import { Context, ContextObj } from "../../types/context";

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateProteinLinks = (proteinItem: ProteinData, diseaseId: string) => {
  const proteinLinks = [];
  const { accession } = proteinItem;
  if (proteinItem.interactions && proteinItem.interactions.length > 0) {
    proteinLinks.push(
      createLink(
        diseaseId,
        accession,
        Context.PROTEIN,
        Context.INTERACTION,
        proteinItem.interactions.length
      )
    );
  }
  if (proteinItem.pathways && proteinItem.pathways.length > 0) {
    proteinLinks.push(
      createLink(
        diseaseId,
        accession,
        Context.PROTEIN,
        Context.PATHWAY,
        proteinItem.pathways.length
      )
    );
  }

  // Do not show count for variants as it's different in proteins API
  if (proteinItem.variants && proteinItem.variants.length > 0) {
    proteinLinks.push({
      name: `${ContextObj[Context.VARIANT as keyof typeof ContextObj].label}s`,
      link: `/disease/${diseaseId}/${
        ContextObj[Context.PROTEIN as keyof typeof ContextObj].id
      }/${accession}/${
        ContextObj[Context.VARIANT as keyof typeof ContextObj].id
      }`,
      color: ContextObj[Context.VARIANT as keyof typeof ContextObj].color,
    });
  }

  if (proteinItem.diseases && proteinItem.diseases.length > 0) {
    proteinLinks.push(
      createLink(
        diseaseId,
        accession,
        Context.PROTEIN,
        Context.DISEASE,
        proteinItem.diseases.length
      )
    );
  }
  if (proteinItem.drugs && proteinItem.drugs.length > 0) {
    proteinLinks.push(
      createLink(
        diseaseId,
        accession,
        Context.PROTEIN,
        Context.DRUG,
        proteinItem.drugs.length
      )
    );
  }
  return proteinLinks;
};

const ProteinCardCompact: FunctionComponent<{
  data: ProteinData;
  diseaseId: string;
  selectedProteinId: string;
}> = ({ data, diseaseId, selectedProteinId }) => {
  const history = useHistory();
  const { accession } = data;
  return (
    <Card
      links={generateProteinLinks(data, diseaseId)}
      key={data.accession}
      onClick={(s: any) =>
        history.push(
          `/${ContextObj[Context.DISEASE].id}/${diseaseId}/${
            ContextObj[Context.PROTEIN].id
          }/${accession}/${ContextObj[Context.PROTEIN].id}`
        )
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
        {data.isExternallyMapped ? (
          <span
            className="label label__manual"
            title="Disease association based on scientific recommendations from specialist research communities"
          >
            Disease association source: Imported
          </span>
        ) : (
          <span className="label label__reviewed">UniProtKB reviewed</span>
        )}
      </h5>
      {data.proteinName} {" • "}
      <strong>Gene:</strong> {data.gene}
    </Card>
  );
};

export default ProteinCardCompact;
