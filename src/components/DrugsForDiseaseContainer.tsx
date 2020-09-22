import React from "react";
import { useParams } from "react-router";
import useApi from "./hooks/UseApi";
import { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import DrugsTable from "./tables/DrugsTable";
import { drugsForDiseaseUrl } from "../urls";
import spinner from "../svg/spinner.svg";

const DrugsForDiseaseContainer = () => {
  const { diseaseid } = useParams();

  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    drugsForDiseaseUrl(diseaseid)
  );

  if (isLoading || !data) {
    return (
      <section className="spinner-container">
        <img src={spinner} alt="logo" width={120} height={50} />
      </section>
    );
  }

  return (
    <PageTemplate
      context={Context.DRUG}
      id={diseaseid}
      length={data?.results?.length}
      isLoading={isLoading}
    >
      <DrugsTable data={data.results} diseaseId={diseaseid} />
    </PageTemplate>
  );
};

export default DrugsForDiseaseContainer;
