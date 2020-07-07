import React, { Fragment, FunctionComponent, FC } from "react";
import { Card } from "franklin-sites";
import { Context } from "../../types/context";
import { createLink } from "../utils";
import { Link } from "react-router-dom";
import TreeLeaf from "../../svg/tree-leaf.svg";
import TreeLeafEnd from "../../svg/tree-leaf-end.svg";
import { getAllItems } from "./DiseaseCardCompact";

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
  const { diseaseId } = diseaseItem;

  const allProts = getAllItems(diseaseItem, "proteins");
  const allDrugs = getAllItems(diseaseItem, "drugs");
  // const allVariants = getAllItems(diseaseItem, "variants");

  if (allProts && allProts.length > 0) {
    // Get the first protein
    const { accession } = allProts[0];
    diseaseLinks.push(
      createLink(
        diseaseId,
        accession,
        Context.PROTEIN,
        Context.PROTEIN,
        allProts.length
      )
    );
  }
  if (allDrugs && allDrugs.length > 0) {
    diseaseLinks.push(
      createLink(
        diseaseId,
        allDrugs[0],
        Context.DRUG,
        Context.DRUG,
        allDrugs.length
      )
    );
  }
  // if (allVariants && allVariants.length > 0) {
  //   diseaseLinks.push(
  //     generateLink(
  //       Context.DISEASE,
  //       Context.VARIANT,
  //       diseaseItem.diseaseId,
  //       allVariants
  //     )
  //   );
  // }
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
          <Link to={`/disease/${disease.diseaseId}/proteins`}>
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
    <Card links={generateDiseaseLinks(data)}>
      <h4>{data.diseaseName}</h4>
      {data.description}
      <hr />
      {data.children && <DiseaseChildren data={data.children} />}
    </Card>
  );
};

export default DiseaseCard;
