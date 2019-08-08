import React, { Fragment, FunctionComponent } from "react";
import { Card } from "franklin-sites";
import color from "../config.json";
import { Context } from "../types/context";

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
    diseaseLinks.push({
      name: `${diseaseItem.proteins.length} protein${
        diseaseItem.proteins.length > 1 ? "(s)" : ""
      }`,
      link: `/${Context.PROTEIN}/${diseaseItem.diseaseId}`,
      color: color.PROTEIN
    });
  }
  if (diseaseItem.drugs && diseaseItem.drugs.length > 0) {
    diseaseLinks.push({
      name: `${diseaseItem.drugs.length} drug${
        diseaseItem.drugs.length > 1 ? "s" : ""
      }`,
      link: `/${Context.DRUGS}/${diseaseItem.diseaseId}`,
      color: color.DRUGS
    });
  }
  if (diseaseItem.variants && diseaseItem.variants.length > 0) {
    diseaseLinks.push({
      name: `${diseaseItem.variants.length} variant${
        diseaseItem.variants.length > 1 ? "s" : ""
      }`,
      link: `/${Context.DISEASEVAR}/${diseaseItem.diseaseId}`,
      color: color.VARIANT
    });
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
