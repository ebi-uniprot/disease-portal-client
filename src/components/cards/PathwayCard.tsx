import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import { Card } from "franklin-sites";

export enum PathwayDbType {
  REACTOME = "Reactome",
  CHEMBL = "ChEMBL",
  DISGENET = "DisGeNET",
  OPENTARGETS = "OpenTargets",
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

interface Diagram {
  loadDiagram(id: string): void;
  detach(): void;
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

  const diagramRef = useRef<Diagram | null>(null);

  useEffect(() => {
    // on unmount
    return () => {
      if (diagramRef.current) {
        // detach diagram and unreference it, to be able to garbage collect it
        diagramRef.current.detach();
        diagramRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (showPathway) {
      diagramRef.current = Reactome.Diagram.create({
        placeHolder: `${data.primaryId}_placeholder`,
        width: 900,
        height: 500,
      }) as Diagram;
      diagramRef.current.loadDiagram(data.primaryId);
    } else if (diagramRef.current) {
      // detach diagram and unreference it, to be able to garbage collect it
      diagramRef.current.detach();
      diagramRef.current = null;
    }
  }, [showPathway, data.primaryId]);

  return (
    <Card>
      <h4>{data.description}</h4>
      <p>
        <a
          href={getUrl(data.dbType, data.primaryId)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.primaryId}
        </a>{" "}
      </p>
      <button
        className="button tertiary"
        onClick={() => setShowPathway((current) => !current)}
      >
        {showPathway ? "Hide " : "Show "}pathway
      </button>
      <div id={`${data.primaryId}_placeholder`} />
    </Card>
  );
};

export default PathwayCard;
