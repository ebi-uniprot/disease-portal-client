import React, { Fragment, FunctionComponent, FC } from "react";
import { Card } from "franklin-sites";
import { uniq } from "lodash-es";
import { Context } from "../../types/context";
import { createTableLink } from "../utils";
import { Link } from "react-router-dom";
import { getAllItems } from "./DiseaseCardCompact";

export type DiseaseData = {
  diseaseId: string;
  diseaseName: string;
  isGroup: boolean;
  acronym: string;
  description: string;
  proteins?: { accession: string; isExternallyMapped: boolean }[];
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
  const allVariants = getAllItems(diseaseItem, "variants");

  // proteins are returned as object so need further processing
  const allUniqueProts = uniq(
    allProts.map(({ accession }: { accession: string }) => accession)
  );

  if (allUniqueProts && allUniqueProts.length > 0) {
    // Get the first protein
    diseaseLinks.push(
      createTableLink(diseaseId, Context.PROTEIN, allUniqueProts.length)
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
          {disease.isGroup ? (
            disease.diseaseName
          ) : (
            <Link to={`/disease/${disease.diseaseId}/proteins`}>
              {i < filtered.length - 1 ? "├" : "└"}
              {disease.diseaseName}
            </Link>
          )}
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
