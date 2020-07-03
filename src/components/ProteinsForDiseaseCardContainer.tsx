import React, { Fragment } from "react";
import { useParams, useHistory } from "react-router";
import useApi from "./hooks/UseApi";
import { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";
import ProteinForDiseaseFilterContainer from "./ProteinForDiseaseFilterContainer";
import { ContextObj, Context } from "../types/context";

const ProteinsForDiseaseCardContainer = () => {
  const { diseaseid, proteinid } = useParams();
  const history = useHistory();

  const { data } = useApi<{ results: ProteinData[] }>(
    `${baseUrl}/disease/${diseaseid}/proteins`
  );

  // const downloadProteins = (proteinIds: string[]) => {
  //   const url = `${baseUrl}/proteins/${proteinIds.join(",")}/download`;
  //   axios({
  //     url: url,
  //     method: "GET",
  //     responseType: "blob", // important
  //   }).then((response) => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "ad-prototype.csv");
  //     document.body.appendChild(link);
  //     link.click();
  //   });
  // };

  if (!data) {
    return null;
  }

  const { results } = data;

  const sortedData = results.sort(
    (a: ProteinData, b: ProteinData) => (b.isExternallyMapped ? 1 : 0) && -1
  );

  if (!proteinid) {
    history.push(
      `/${ContextObj[Context.DISEASE].id}/${diseaseid}/${
        ContextObj[Context.PROTEIN].id
      }/${sortedData[0].accession}/${ContextObj[Context.PROTEIN].id}`
    );
  }

  return (
    <Fragment>
      {/* <PageContainer
        leftColumn={}
        rightColumn={
          <PageTemplate
            context={Context.PROTEIN}
            id={id}
            length={data && data.results.length}
            isLoading={isLoading}
          >
            {data && data.results.length <= 300 && (
              <button
                className="button align-right"
                type="button"
                onClick={() =>
                  downloadProteins(
                    data.results.map(
                      (protein: ProteinData) => protein.accession
                    )
                  )
                }
              >
                Download
              </button>
            )}
          </PageTemplate>
        }
      /> */}
      <ProteinForDiseaseFilterContainer
        data={sortedData}
        diseaseId={diseaseid}
        selectedProteinId={proteinid}
      />
    </Fragment>
  );
};

export default ProteinsForDiseaseCardContainer;
