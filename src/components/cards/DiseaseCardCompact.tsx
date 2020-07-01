import React, { Fragment, FunctionComponent, FC } from "react";
import { Card } from "franklin-sites";
import { Context } from "../../types/context";
import { generateLink, getProteinLink } from "../utils";
import { Link } from "react-router-dom";
import TreeLeaf from "../../svg/tree-leaf.svg";
import TreeLeafEnd from "../../svg/tree-leaf-end.svg";
import { DiseaseData } from "./DiseaseCard";

function getAllItems(
  diseaseItem: DiseaseData,
  keyName: keyof DiseaseData,
  totalItems = new Set()
): any {
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
}

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
      getProteinLink(diseaseId, accession, "protein", allProts.length)
    );
  }
  if (allDrugs && allDrugs.length > 0) {
    // Get the first protein
    const { accession } = allProts[0];
    diseaseLinks.push(
      getProteinLink(diseaseId, accession, "drug", allProts.length)
    );
    diseaseLinks.push(
      generateLink(
        Context.DISEASE,
        Context.DRUG,
        diseaseItem.diseaseId,
        allDrugs
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

const DiseaseCardCompact: FunctionComponent<{ data: DiseaseData }> = ({
  data,
}) => {
  return (
    <Card links={generateDiseaseLinks(data)} key={data.diseaseId}>
      <h4>{data.diseaseName}</h4>
    </Card>
  );
};

export default DiseaseCardCompact;
