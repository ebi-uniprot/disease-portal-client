import React, { Fragment, FunctionComponent } from "react";
import { Card } from "franklin-sites";
import { Context } from "../types/context";
import { generateLink } from "./utils";

export type DiseaseData = {
  diseaseId: string;
  diseaseName: string;
  acronym: string;
  description: string;
  proteins?: string[];
  variants?: string[];
  drugs?: string[];
  publications?: { type: string; id: string }[];
};

const generateDiseaseLinks = (diseaseItem: DiseaseData) => {
  const diseaseLinks = [];
  if (diseaseItem.proteins && diseaseItem.proteins.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.PROTEIN,
        diseaseItem.diseaseId,
        diseaseItem.proteins
      )
    );
  }
  if (diseaseItem.drugs && diseaseItem.drugs.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.DRUG,
        diseaseItem.diseaseId,
        diseaseItem.drugs
      )
    );
  }
  if (diseaseItem.variants && diseaseItem.variants.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.VARIANT,
        diseaseItem.diseaseId,
        diseaseItem.variants
      )
    );
  }
  return diseaseLinks;
};

const DiseaseCard: FunctionComponent<{ data: DiseaseData }> = ({ data }) => (
  <Card
    title={data.diseaseName}
    links={generateDiseaseLinks(data)}
    key={data.diseaseId}
  >
    {data.description}
    {/* ADD CHILDREN HERE */}
  </Card>
);

export default DiseaseCard;
