import React, { FunctionComponent, useEffect, useRef } from "react";
import { Card, ButtonModal } from "franklin-sites";

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
  highlightItem(id: string): void;
  flagItems(id: string): void;
  selectItem(stId: string): void;
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

const Pathway: FunctionComponent<{ id: string; protein: string }> = ({
  id,
  protein,
}) => {
  const diagramRef = useRef<Diagram | null>(null);
  const dummyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dummyRef.current) {
      diagramRef.current = Reactome.Diagram.create({
        placeHolder: `${id}_placeholder`,
        width: dummyRef.current.offsetWidth,
        height: 500,
      }) as Diagram;
      diagramRef.current.loadDiagram(id);
      // Note: it doesn't look like the line below is working, maybe using wrong id
      diagramRef.current.selectItem(protein);
    } else if (diagramRef.current) {
      // detach diagram and unreference it, to be able to garbage collect it
      diagramRef.current.detach();
      diagramRef.current = null;
    }
  }, [id, protein]);

  return (
    <>
      <div ref={dummyRef} />
      <div id={`${id}_placeholder`} style={{ backgroundColor: "#FFF" }} />
    </>
  );
};

const PathwayCard: FunctionComponent<{
  data: PathwayData;
  protein: string;
}> = ({ data, protein }) => {
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
      <ButtonModal
        buttonText="Show pathway"
        className="button"
        title={data.description}
      >
        <Pathway id={data.primaryId} protein={protein} />
      </ButtonModal>
    </Card>
  );
};

export default PathwayCard;
