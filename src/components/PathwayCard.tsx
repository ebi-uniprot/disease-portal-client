import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Card } from "franklin-sites";
import color from "../config.json";
import { Context } from "./CardContainer";

export enum PathwayDbType {
  REACTOME = "Reactome",
  CHEMBL = "ChEMBL",
  DISGENET = "DisGeNET",
  OPENTARGETS = "OpenTargets"
}

export type PathwayData = {
  dbType: PathwayDbType;
  description: string;
  primaryId: string;
};

declare var Reactome: any;
declare global {
  interface Window {
    onReactomeDiagramReady: any;
  }
}

const getUrl = (dbType: PathwayDbType, id: string) => {
  switch (dbType) {
    case PathwayDbType.REACTOME:
      return `//reactome.org/content/detail/${id}`;
    case PathwayDbType.CHEMBL:
      return `//www.ebi.ac.uk/chembl/target/inspect/${id}`;
    case PathwayDbType.OPENTARGETS:
      return `//www.targetvalidation.org/target/${id}`;
    case PathwayDbType.DISGENET:
      return `//disgenet.org/search?q=${id}`;
  }
};

const PathwayCard: FunctionComponent<{ data: PathwayData }> = ({ data }) => {
  const [showPathway, setShowPathway] = useState(false);

  useEffect(() => {
    if (showPathway) {
      const diagram = Reactome.Diagram.create({
        placeHolder: `${data.primaryId}_placeholder`,
        width: 900,
        height: 500
      });
      diagram.loadDiagram(data.primaryId);
    }
  }, [showPathway]);

  return (
    <Card title={data.description} key={data.primaryId}>
      <p>
        <a href={getUrl(data.dbType, data.primaryId)} target="_blank">
          {data.primaryId}
        </a>
      </p>
      <button className="button" onClick={() => setShowPathway(true)}>
        Show pathway
      </button>
      <div id={`${data.primaryId}_placeholder`} />
    </Card>
  );
};

export default PathwayCard;
