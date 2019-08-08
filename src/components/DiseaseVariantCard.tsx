import React, { FunctionComponent, Fragment } from "react";
import { Card, InfoList } from "franklin-sites";
import { Context } from "../types/context";
import { colors } from "../config";

type DiseaseVariant = {
  altSeq: string;
  featureId: string;
  featureLocation: {
    startModifier: string;
    endModifier: string;
    startId: number;
    endId: number;
  };
  featureStatus: string;
  origSeq: string;
  report: string;
};

const generateDiseaseLinks = (accession: string) => {
  const diseaseLinks = [
    {
      name: `All ${accession} variants`,
      link: `/${Context.VARIANT}/${accession}`,
      color: colors.PROTEIN
    }
  ];
  return diseaseLinks;
};

const getDataAsInfoList = (variant: DiseaseVariant) => {
  return [
    {
      title: "Position",
      content: variant.featureLocation.startId
    },
    {
      title: "Variation",
      content: `${variant.origSeq} -> ${variant.altSeq}`
    },
    {
      title: "Status",
      content: variant.featureStatus
    },
    {
      title: "Report",
      content: variant.report
    }
  ];
};

const DiseaseVariantCard: FunctionComponent<{
  data: DiseaseVariant[];
  accession: string;
}> = ({ data, accession }) => {
  return (
    <Card
      title={accession}
      links={generateDiseaseLinks(accession)}
      key={accession}
    >
      {data.map(variant => (
        <Fragment key={variant.featureId}>
          <h5>{variant.featureId}</h5>
          <InfoList infoData={getDataAsInfoList(variant)} />
        </Fragment>
      ))}
    </Card>
  );
};

export default DiseaseVariantCard;
