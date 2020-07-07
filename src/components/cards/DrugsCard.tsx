import React, { FunctionComponent } from "react";
import { Card, InfoList } from "franklin-sites";

export type DrugsData = {
  name: string;
  sourceType: string;
  sourceId: string;
  moleculeType: string;
  clinicalTrialLink: string;
  clinicalTrialPhase: number;
  evidences: string[];
  mechanismOfAction: string;
  diseases?: string[];
  proteins?: string[];
};

const DrugsCard: FunctionComponent<{ data: DrugsData }> = ({ data }) => {
  const infoData = [
    {
      title: "Clinical trial",
      content: (
        <a
          href={data.clinicalTrialLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Phase {data.clinicalTrialPhase}
        </a>
      ),
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
      title: "Source",
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
      content: data.evidences.map((evidence) => (
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
