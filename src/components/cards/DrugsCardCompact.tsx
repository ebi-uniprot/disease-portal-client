import React, { FunctionComponent } from "react";
import { Card } from "franklin-sites";
import { Context } from "../../types/context";
import { createLink } from "../utils";
import { DrugsData } from "./DrugsCard";

const generateDrugsLinks = (drugItem: DrugsData, diseaseId: string) => {
  const drugsLinks = [];
  const { name } = drugItem;
  // if (proteinItem.diseases && proteinItem.diseases.length > 0) {
  //   drugsLinks.push(
  //     generateLink(
  //       Context.DRUG,
  //       Context.DISEASE,
  //       proteinItem.name,
  //       proteinItem.diseases
  //     )
  //   );
  // }
  if (drugItem.proteins && drugItem.proteins.length > 0) {
    drugsLinks.push(
      createLink(
        diseaseId,
        name,
        Context.DRUG,
        Context.PROTEIN,
        drugItem.proteins.length
      )
    );
  }
  return drugsLinks;
};

const DrugsCardCompact: FunctionComponent<{
  data: DrugsData;
  diseaseId: string;
}> = ({ data, diseaseId }) => (
  <Card key={data.name} links={generateDrugsLinks(data, diseaseId)}>
    <h5>
      {data.name}
      <small> (phase {data.clinicalTrialPhase})</small>
    </h5>
  </Card>
);

export default DrugsCardCompact;
