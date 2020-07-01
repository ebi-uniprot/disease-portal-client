import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router";
import useApi from "./hooks/UseApi";
import { ProteinData } from "./cards/ProteinCard";
import { baseUrl } from "../config";
import ProteinForDiseaseFilterContainer from "./ProteinForDiseaseFilterContainer";

const ProteinsForDiseaseCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ history }) => {
  const { diseaseid, proteinid } = useParams();

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

  if (!proteinid) {
    history.push(
      `/disease/${diseaseid}/proteins/${results[0].accession}/protein`
    );
  }

  const sortedData = results.sort(
    (a: ProteinData, b: ProteinData) => (b.isExternallyMapped ? 1 : 0) && -1
  );

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

export default withRouter(ProteinsForDiseaseCardContainer);
