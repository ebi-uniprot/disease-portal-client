import React from "react";
import ProteinCard from "./cards/ProteinCard";
import { useParams } from "react-router";
import { gql, useQuery } from "@apollo/client";
import ResponseHandler from "./ResponseHandler";

const PROTEIN = gql`
  query getProtein($proteinid: String!) {
    protein(accession: $proteinid) {
      proteinName
      proteinId
      accession
      gene
      description
      diseases {
        diseaseName
      }
      pathways {
        primaryId
      }
      interactions {
        accession
      }
      variants {
        type
      }
    }
  }
`;

const ProteinContainer = () => {
  const { proteinid } = useParams();

  const { loading, error, data } = useQuery(PROTEIN, {
    variables: { proteinid },
  });

  return (
    <ResponseHandler loading={loading} error={error} data={data}>
      <ProteinCard data={data?.protein} id={proteinid} />
    </ResponseHandler>
  );
};

export default ProteinContainer;
