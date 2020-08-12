import React from "react";
import { useParams } from "react-router";

import DiseaseCard from "./cards/DiseaseCard";
import { gql, useQuery } from "@apollo/client";
import ResponseHandler from "./ResponseHandler";
import { getDisease_disease } from "../generated-types/getDisease";

const DISEASES_FOR_PROTEIN = gql`
  query getDiseasesForProtein($id: String!) {
    protein(accession: $id) {
      diseases {
        diseaseId
        diseaseName
        description
        source
        note
        synonyms {
          name
          source
        }
        publications {
          pubId
          pubType
        }
      }
    }
  }
`;

const DiseasesForProteinCardContainer = () => {
  const { proteinid: id } = useParams();

  const { loading, error, data } = useQuery(DISEASES_FOR_PROTEIN, {
    variables: { id },
  });

  return (
    <ResponseHandler loading={loading} error={error} data={data}>
      {data?.protein?.diseases?.map((item: getDisease_disease) => (
        <DiseaseCard data={item} key={item.diseaseId} />
      ))}
    </ResponseHandler>
  );
};

export default DiseasesForProteinCardContainer;
