import React, { Fragment, FunctionComponent } from "react";
// import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import { ProteinData } from "./cards/ProteinCard";
// import PageTemplate from "../layout/PageTemplate";
// import { Context } from "../types/context";
import DiseaseContainer from "./DiseaseContainer";
// import PageContainer from "../layout/PageContainer";
import { baseUrl } from "../config";
import ProteinForDiseaseFilterContainer from "./ProteinForDiseaseFilterContainer";
import ThreePartGrid from "../layout/ThreePartGrid";

const ProteinsForDiseaseCardContainer: FunctionComponent<
  RouteComponentProps<any> & { identifier?: string }
> = ({ match, identifier }) => {
  let id: string;
  if (identifier) {
    id = identifier;
  } else {
    id = match.params.id;
  }

  const { data } = useApi<{ results: ProteinData[] }>(
    `${baseUrl}/disease/${id}/proteins`
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

  const sortedData = data.results.sort(
    (a: ProteinData, b: ProteinData) => (b.isExternallyMapped ? 1 : 0) && -1
  );

  return (
    <Fragment>
      <ThreePartGrid
        top={<DiseaseContainer id={id} />}
        left={<ProteinForDiseaseFilterContainer data={sortedData} id={id} />}
        right={<span>Right</span>}
      />

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
    </Fragment>
  );
};

export default withRouter(ProteinsForDiseaseCardContainer);
