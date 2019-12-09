import React, { Fragment, FunctionComponent, FC } from "react";
import { Card } from "franklin-sites";
import { Context } from "../../types/context";
import { generateLink } from "../utils";
import { Link } from "react-router-dom";
import TreeLeaf from "../../svg/tree-leaf.svg";
import TreeLeafEnd from "../../svg/tree-leaf-end.svg";

export type DiseaseData = {
  diseaseId: string;
  diseaseName: string;
  acronym: string;
  description: string;
  proteins?: string[];
  variants?: string[];
  drugs?: string[];
  children?: DiseaseData[];
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

const DiseaseChildren: FC<{ data: DiseaseData[]; depth?: number }> = ({
  data,
  depth = 0
}) => {
  const filtered = data.filter(
    disease =>
      (disease.children && disease.children.length > 0) ||
      (disease.proteins && disease.proteins.length > 0)
  );
  return (
    <Fragment>
      {filtered.map((disease, i) => (
        <div key={disease.diseaseId} style={{ marginLeft: `${depth}rem` }}>
          <Link to={`/${Context.DISEASE}/${disease.diseaseId}`}>
            <img
              src={i < filtered.length - 1 ? TreeLeaf : TreeLeafEnd}
              width={25}
              height={25}
            />
            {disease.diseaseName}
          </Link>
          {disease.children && (
            <DiseaseChildren data={disease.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </Fragment>
  );
};

const DiseaseCard: FunctionComponent<{ data: DiseaseData }> = ({ data }) => {
  return (
    <Card
      title={data.diseaseName}
      links={generateDiseaseLinks(data)}
      key={data.diseaseId}
    >
      {data.description}
      <hr />
      {data.children && <DiseaseChildren data={data.children} />}
    </Card>
  );
};

export default DiseaseCard;
