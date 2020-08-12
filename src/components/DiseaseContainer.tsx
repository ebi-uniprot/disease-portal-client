import React, { FunctionComponent } from "react";
import { useParams } from "react-router";
import DiseaseCardCompact from "./cards/DiseaseCardCompact";
import { gql, useQuery } from "@apollo/client";
import ResponseHandler from "./ResponseHandler";

const DISEASE = gql`
  query getDisease($id: String!) {
    disease(diseaseId: $id) {
      diseaseId
      diseaseName
      description
      children {
        diseaseName
        proteins {
          proteinId
        }
        children {
          children {
            diseaseName
          }
          diseaseName
        }
      }
      proteins {
        proteinId
        proteinCrossRefs {
          drugs {
            name
          }
        }
      }
      variants {
        cvId
      }
    }
  }
`;

const DiseaseContainer: FunctionComponent = () => {
  const { id } = useParams();

  const { loading, error, data } = useQuery(DISEASE, {
    variables: { id },
  });

  return (
    <ResponseHandler loading={loading} error={error} data={data}>
      <DiseaseCardCompact data={data?.disease} />
    </ResponseHandler>
  );
};

export default DiseaseContainer;
