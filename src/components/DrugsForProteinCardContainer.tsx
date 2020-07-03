import React, { Fragment } from "react";
import { useParams } from "react-router";
import { v1 } from "uuid";
import useApi from "./hooks/UseApi";
import DrugsCard, { DrugsData } from "./cards/DrugsCard";
import PageTemplate from "../layout/PageTemplate";
import { Context } from "../types/context";
import { baseUrl } from "../config";

const DrugsForProteinCardContainer = () => {
  const { proteinid } = useParams();
  const { data, isLoading } = useApi<{ results: DrugsData[] }>(
    `${baseUrl}/protein/${proteinid}/drugs`
  );

  return (
    <Fragment>
      <PageTemplate
        context={Context.DRUG}
        id={proteinid}
        length={data?.results && data.results.length}
        isLoading={isLoading}
      >
        {data &&
          data.results.map((item: DrugsData) => (
            <DrugsCard data={item} key={v1()} />
          ))}
      </PageTemplate>
    </Fragment>
  );
};

export default DrugsForProteinCardContainer;
