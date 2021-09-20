import React, { Fragment, FunctionComponent } from "react";
import { Card, InfoList } from "franklin-sites";
import { Link } from "react-router-dom";
import { Context, ContextObj } from "../../types/context";

export type DiseaseForDrug = {
  diseaseId: string;
  diseaseName: string;
  proteinCount?: number;
};

export type DrugsData = {
  name: string;
  proteinAccession: string;
  disease: DiseaseForDrug;
  moleculeType: string;
  mechanismOfAction: string;
  maxTrialPhase: number;
  clinicalTrialLink: string;
  sourceType: string;
  sourceIds: string[];
  evidences?: string[];
};

const DiseaseLink: FunctionComponent<{
  name: string;
  withProteins: boolean;
}> = ({ name, withProteins }) => {
  return withProteins ? (
    <Link
      to={`/${ContextObj[Context.DISEASE].id}/${name}/${
        ContextObj[Context.PROTEIN].id
      }`}
    >
      {name}
    </Link>
  ) : (
    <>
      {name.match(/http/) ? (
        <a href={name} target="_blank" rel="noopener noreferrer">
          {name}
        </a>
      ) : (
        <>{name}</>
      )}
    </>
  );
};

const DrugsCardItem: FunctionComponent<{ data: DrugsData }> = ({ data }) => {
  const infoData = [
    {
      title: "Max Phase",
      content:
        data.maxTrialPhase &&
        (data.clinicalTrialLink ? (
          <a
            href={data.clinicalTrialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Phase {data.maxTrialPhase}
          </a>
        ) : (
          `Phase ${data.maxTrialPhase}`
        )),
    },
    {
      title: "Type",
      content: data.moleculeType,
    },
    {
      title: "Mechanism of action",
      content: data.mechanismOfAction,
    },
    {
      title: "Disease(s)",
      content: data.disease.diseaseName && (
        <DiseaseLink
          name={data.disease.diseaseName}
          withProteins={
            data.disease.proteinCount !== undefined &&
            data.disease.proteinCount > 0
          }
        />
      ),
    },
    {
      title: "Cross Reference",
      content: data.sourceIds.map((sourceId) => (
        <a
          href={`//www.ebi.ac.uk/chembl/compound_report_card/${sourceId}`}
          target="_blank"
          rel="noopener noreferrer"
          key={sourceId}
        >
          {sourceId}
        </a>
      )),
    },
    {
      title: "Evidences",
      content: data.evidences?.map((evidence) => (
        <div key={evidence}>
          <a href={evidence} target="_blank" rel="noopener noreferrer">
            {evidence}
          </a>
        </div>
      )),
    },
  ];

  return <InfoList infoData={infoData} />;
};

const DrugsCard: FunctionComponent<{ data: DrugsData[]; drugName: string }> = ({
  data,
  drugName,
}) => {
  return (
    <Card>
      <h4>{drugName}</h4>
      {data.map((drugsItem, index) => (
        <Fragment
          key={`${drugsItem.disease.diseaseName}${drugsItem.mechanismOfAction}`}
        >
          {index !== 0 && <hr />}
          <DrugsCardItem data={drugsItem} />
        </Fragment>
      ))}
    </Card>
  );
};

export default DrugsCard;
