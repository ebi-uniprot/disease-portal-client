import React, { Fragment, FunctionComponent } from "react";
import { Card } from "franklin-sites";
import color from "../config.json";
import { Context } from "../types/context";

export type DrugsData = {
  name: string;
  sourceType: string;
  sourceId: string;
  moleculeType: string;
};

const DrugsCard: FunctionComponent<{ data: DrugsData }> = ({ data }) => (
  <Card title={data.name} key={data.name}>
    <p>
      {data.moleculeType}{" "}
      <a
        href={`//www.ebi.ac.uk/chembl/compound_report_card/${data.sourceId}`}
        target="_blank"
      >
        {data.sourceId}
      </a>
    </p>
  </Card>
);

export default DrugsCard;
