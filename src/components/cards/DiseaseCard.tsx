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

const getAllItems = (
  diseaseItem: DiseaseData,
  keyName: keyof DiseaseData,
  totalItems = new Set()
) => {
  const items = diseaseItem[keyName] as any[];
  if (items) {
    items.forEach((item: any) => totalItems.add(item));
  }
  if (diseaseItem.children) {
    diseaseItem.children.forEach((childDisease) => {
      getAllItems(childDisease, keyName, totalItems);
    });
  }
  return Array.from(totalItems);
};

const generateDiseaseLinks = (diseaseItem: DiseaseData) => {
  const diseaseLinks = [];

  const allProts = getAllItems(diseaseItem, "proteins");
  const allDrugs = getAllItems(diseaseItem, "drugs");
  const allVariants = getAllItems(diseaseItem, "variants");

  if (allProts && allProts.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.PROTEIN,
        diseaseItem.diseaseId,
        allProts
      )
    );
  }
  if (allDrugs && allDrugs.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.DRUG,
        diseaseItem.diseaseId,
        allDrugs
      )
    );
  }
  if (allVariants && allVariants.length > 0) {
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.VARIANT,
        diseaseItem.diseaseId,
        allVariants
      )
    );
  }
  return diseaseLinks;
};

const DiseaseChildren: FC<{ data: DiseaseData[]; depth?: number }> = ({
  data,
  depth = 0,
}) => {
  const filtered = data.filter(
    (disease) =>
      (disease.children && disease.children.length > 0) ||
      (disease.proteins && disease.proteins.length > 0)
  );
  return (
    <Fragment>
      {filtered.map((disease, i) => (
        <div key={disease.diseaseId} style={{ marginLeft: `${depth}rem` }}>
          <Link to={`/${Context.DISEASE}/${disease.diseaseId}`}>
            <img
              alt="plus/minus"
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
