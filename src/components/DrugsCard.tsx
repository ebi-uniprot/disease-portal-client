import React, { Fragment, FunctionComponent } from "react";
import { Card, InfoList } from "franklin-sites";
import color from "../config.json";
import { Context } from "../types/context";

export type DrugsData = {
  name: string;
  sourceType: string;
  sourceId: string;
  moleculeType: string;
  clinicalTrialLink: string;
  clinicalTrialPhase: number;
  evidences: string[];
  mechanismOfAction: string;
};

const DrugsCard: FunctionComponent<{ data: DrugsData }> = ({ data }) => {
  const infoData = [
    {
      title: "Clinical trial",
      content: (
        <a href={data.clinicalTrialLink} target="_blank">
          Phase {data.clinicalTrialPhase}
        </a>
      )
    },
    {
      title: "Type",
      content: data.moleculeType
    },
    {
      title: "Mechanism of action",
      content: data.mechanismOfAction
    },
    {
      title: "Source",
      content: (
        <a
          href={`//www.ebi.ac.uk/chembl/compound_report_card/${data.sourceId}`}
          target="_blank"
        >
          {data.sourceId}
        </a>
      )
    },
    {
      title: "Evidences",
      content: data.evidences.map(evidence => (
        <a href={evidence} target="_blank">
          {evidence}
        </a>
      ))
    }
  ];

  return (
    <Card title={data.name} key={data.name}>
      <InfoList infoData={infoData} />
    </Card>
  );
};

export default DrugsCard;
