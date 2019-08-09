import React, { Fragment, FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import DiseaseVariantCard from "./DiseaseVariantCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";

const groupBy = (items: any[], key: string) => {
  if (!items) {
    return null;
  }
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item]
    }),
    {}
  );
};

const VariantsForDiseaseCardContainer: FunctionComponent<
  RouteComponentProps<any>
> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(
    `//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/disease/${id}/variants`
  );

  const groupedData = groupBy(data.results, "proteinAccession");

  return (
    <Fragment>
      <PageTemplate
        context={Context.VARIANT}
        id={id}
        length={data && data.results.length}
        isLoading={isLoading}
      >
        {groupedData &&
          Object.keys(groupedData).map(item => (
            <DiseaseVariantCard
              accession={item}
              data={groupedData && groupedData[item]}
              key={v1()}
            />
          ))}
      </PageTemplate>
    </Fragment>
  );
};

export default VariantsForDiseaseCardContainer;
