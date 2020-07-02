import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import DiseaseVariantCard, { DiseaseVariant } from "./cards/DiseaseVariantCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const groupBy = (items: any[], key: string) => {
  if (!items) {
    return null;
  }
  return items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
};

const VariantsForDiseaseContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<{ results: DiseaseVariant[] }>(
    `${baseUrl}/disease/${id}/variants`
  );

  if (!data) {
    return null;
  }

  const groupedData = groupBy(data.results, "proteinAccession");
  return (
    <PageTemplate
      context={Context.VARIANT}
      id={id}
      length={data?.results && data.results.length}
      isLoading={isLoading}
    >
      {groupedData &&
        Object.keys(groupedData).map((item) => (
          <DiseaseVariantCard
            accession={item}
            data={groupedData && groupedData[item]}
            key={v1()}
          />
        ))}
    </PageTemplate>
  );
};

export default VariantsForDiseaseContainer;
