import React, { FunctionComponent } from "react";
import { Card } from "franklin-sites";
import { Context } from "../../types/context";
import { ProteinData } from "./ProteinCard";
import { colors } from "../../config";

export const formatLargeNumber = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getProteinLink = (
  diseaseId: string,
  accession: string,
  type: string,
  count: number
) => ({
  name: `${count} ${type}${count > 1 ? "s" : ""}`,
  link: `/disease/${diseaseId}/proteins/${accession}/${type}`,
  color: colors.get(Context.INTERACTION),
});

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
        "pathways",
        proteinItem.pathways.length
      )
    );
  }
  if (proteinItem.variants && proteinItem.variants.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "variants",
        proteinItem.variants.length
      )
    );
  }
  if (proteinItem.diseases && proteinItem.diseases.length > 0) {
    proteinLinks.push(
      getProteinLink(
        diseaseId,
        accession,
        "diseases",
        proteinItem.diseases.length
      )
    );
  }
  if (proteinItem.drugs && proteinItem.drugs.length > 0) {
    proteinLinks.push(
      getProteinLink(diseaseId, accession, "drugs", proteinItem.drugs.length)
    );
  }
  return proteinLinks;
};

const ProteinCardCompact: FunctionComponent<{
  data: ProteinData;
  diseaseId: string;
}> = ({ data, diseaseId }) => {
  return (
    <Card links={generateProteinLinks(data, diseaseId)} key={data.proteinId}>
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

export default ProteinCardCompact;
