import React, { Fragment, useState, useEffect, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import axios from "axios";
import { v1 } from "uuid";
import DiseaseCard from "./DiseaseCard";
import ProteinCard from "./ProteinCard";
import PathwayCard, { PathwayDbType } from "./PathwayCard";

export enum Context {
  SEARCH = "search",
  DISEASE = "diseases",
  PROTEIN = "proteins",
  INTERACTION = "interactions",
  PATHWAY = "pathways"
}

type APIResult = {
  results: any[];
};

const prefix = "//wp-np2-be.ebi.ac.uk:8086/v1/ds";

const getUrl = (context: Context, id: string) => {
  switch (context) {
    case Context.SEARCH:
      return `${prefix}/diseases/search/${id}`;
    case Context.DISEASE:
      return `${prefix}/protein/${id}/diseases`;
    case Context.PROTEIN:
      return `${prefix}/disease/${id}/proteins`;
    case Context.INTERACTION:
      return `${prefix}/protein/${id}/interactions`;
    case Context.PATHWAY:
      return `${prefix}/protein/${id}/xrefs`;
    default:
      return "";
  }
};

const CardContainer: FunctionComponent<RouteComponentProps<any>> = ({
  match
}) => {
  const [data, setData] = useState<APIResult | undefined>(undefined);
  const { context, id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      const results = await axios(getUrl(context, id));
      setData(results.data);
    };
    fetchData();
  }, [context, id]);

  if (typeof data === "undefined") {
    return null;
  }

  return (
    <Fragment>
      <h2>
        {data.results.length} {context} for {id}
      </h2>
      {(() => {
        switch (context) {
          case Context.SEARCH:
          case Context.DISEASE:
            return data.results.map(item => (
              <DiseaseCard data={item} key={v1()} />
            ));
          case Context.PROTEIN:
            console.log(data.results);
            return data.results.map(item => (
              <ProteinCard data={item} key={v1()} />
            ));
          case Context.INTERACTION:
          // TODO some kind of visualisation
          case Context.PATHWAY:
            return data.results
              .filter(d => d.dbType === PathwayDbType.REACTOME)
              .map(item => <PathwayCard data={item} key={v1()} />);
        }
      })()}
    </Fragment>
  );
};

export default withRouter(CardContainer);
