import React, { Fragment, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import DiseaseVariantCard from "./DiseaseVariantCard";

const groupBy = (items: any[], key: string) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  );

const DiseaseVariantCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/disease/${id}/variants`
  );
  if (!data) {
    return null;
  }
  const groupedData = groupBy(data.results, "proteinAccession");

  return (
    <Fragment>
      <div className="page-header">
        <h2>
          {data.results.length} variants(s) for {id}
        </h2>
      </div>
      {Object.keys(groupedData).map(item => (
        <DiseaseVariantCard
          accession={item}
          data={groupedData[item]}
          key={v1()}
        />
      ))}
    </Fragment>
  );
};

export default DiseaseVariantCardContainer;
