import React, { FunctionComponent, FC, Fragment } from "react";
import { Card } from "franklin-sites";
import { Context, ContextObj } from "../../types/context";
import { createTableLink } from "../utils";
import { DiseaseData } from "./DiseaseCard";
import { useHistory } from "react-router";

import "./DiseaseCardCompact.css";

export function getAllItems(
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
  const allVariants = getAllItems(diseaseItem, "variants");

  if (allProts && allProts.length > 0) {
    diseaseLinks.push(
      createTableLink(diseaseId, Context.PROTEIN, allProts.length)
    );
  }
  if (allDrugs && allDrugs.length > 0) {
    diseaseLinks.push(
      createTableLink(diseaseId, Context.DRUG, allDrugs.length)
    );
  }
  if (allVariants && allVariants.length > 0) {
    diseaseLinks.push(
      createTableLink(diseaseId, Context.VARIANT, allVariants.length)
    );
  }
  return diseaseLinks;
};

const generateSpacer = (size: number) => "─".repeat(size);

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
    <>
      {filtered.map((disease, i) => (
        <Fragment key={disease.diseaseName}>
          <option value={disease.diseaseName}>
            {i < filtered.length - 1 ? "├" : "└"}
            {generateSpacer(depth)}
            {disease.diseaseName}
          </option>
          {disease.children && (
            <DiseaseChildren data={disease.children} depth={depth + 1} />
          )}
        </Fragment>
      ))}
    </>
  );
};

const DiseaseCardCompact: FunctionComponent<{ data: DiseaseData }> = ({
  data,
}) => {
  const history = useHistory();

  return (
    <Card
      links={generateDiseaseLinks(data)}
      key={data.diseaseId}
      className="disease-compact"
    >
      <section className="disease-title">
        <h4>{data.diseaseName}</h4>
        {data.children && data.children.length > 0 && (
          <select
            onChange={(val) => {
              history.push(
                `/${ContextObj[Context.DISEASE].id}/${val.target.value}/${
                  ContextObj[Context.PROTEIN].id
                }`
              );
            }}
          >
            <option>Select sub-type</option>
            <DiseaseChildren data={data.children} />
          </select>
        )}
      </section>
      <section className="disease-description">{data.description}</section>
    </Card>
  );
};

export default DiseaseCardCompact;
