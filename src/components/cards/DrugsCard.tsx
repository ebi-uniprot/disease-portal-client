import React, { FunctionComponent } from "react";
import { Card, InfoList, ExpandableList } from "franklin-sites";
import { groupBy, sortBy } from "lodash-es";
import { Link } from "react-router-dom";
import { Context, ContextObj } from "../../types/context";

export type DiseaseForDrug = {
  diseaseId: string;
  diseaseName: string;
  proteinCount?: number;
};

export type DrugsData = {
  name: string;
  sourceType: string;
  sourceId: string;
  moleculeType: string;
  clinicalTrialLink: string;
  clinicalTrialPhase: number;
  evidences?: string[];
  mechanismOfAction: string;
  diseases?: DiseaseForDrug[];
  proteins?: string[];
};

export const sortDiseases = (diseases: DiseaseForDrug[]) => {
  const grouped = groupBy(
    diseases,
    (disease) => disease.proteinCount !== undefined && disease.proteinCount > 0
  );
  return [
    ...(grouped["true"] ? sortBy(grouped["true"], "diseaseName") : []),
    ...(grouped["false"] ? sortBy(grouped["false"], "diseaseName") : []),
  ];
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

const DrugsCard: FunctionComponent<{ data: DrugsData }> = ({ data }) => {
  const infoData = [
    {
      title: "Max Phase",
      content:
        data.clinicalTrialPhase &&
        (data.clinicalTrialLink ? (
          <a
            href={data.clinicalTrialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Phase {data.clinicalTrialPhase}
          </a>
        ) : (
          `Phase ${data.clinicalTrialPhase}`
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
      content: (
        <>
          {data.diseases && (
            <ExpandableList
              numberCollapsedItems={5}
              descriptionString="diseases"
            >
              {sortDiseases(data.diseases).map((disease) => ({
                id: disease.diseaseName,
                content: (
                  <DiseaseLink
                    name={disease.diseaseName}
                    withProteins={
                      disease.proteinCount !== undefined &&
                      disease.proteinCount > 0
                    }
                  />
                ),
              }))}
            </ExpandableList>
          )}
        </>
      ),
    },
    {
      title: "Cross Reference",
      content: (
        <a
          href={`//www.ebi.ac.uk/chembl/compound_report_card/${data.sourceId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.sourceId}
        </a>
      ),
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

  return (
    <Card>
      <h4>{data.name}</h4>
      <InfoList infoData={infoData} />
    </Card>
  );
};

export default DrugsCard;
