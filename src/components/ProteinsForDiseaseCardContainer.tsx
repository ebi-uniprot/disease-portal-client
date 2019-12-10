import React, { Fragment, FunctionComponent } from "react";
import axios from "axios";
import { withRouter, RouteComponentProps } from "react-router";
import { v1 } from "uuid";
import useApi from "./UseApi";
import ProteinCard, { ProteinData } from "./cards/ProteinCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";
import DiseaseContainer from "./DiseaseContainer";
import PageContainer from "../PageContainer";
import { baseUrl } from "../config";

const ProteinsForDiseaseCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi(`${baseUrl}/disease/${id}/proteins`);

  const downloadProteins = (proteinIds: string[]) => {
    const url = `${baseUrl}/proteins/${proteinIds.join(",")}/download`;
    axios({
      url: url,
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ad-prototype.csv");
      document.body.appendChild(link);
      link.click();
    });
    console.log(url);
  };

  return (
    <Fragment>
      <PageContainer
        leftColumn={<DiseaseContainer id={id} />}
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

            {data &&
              data.results.map((item: ProteinData) => (
                <ProteinCard data={item} id={id} key={v1()} />
              ))}
          </PageTemplate>
        }
      />
    </Fragment>
  );
};

export default withRouter(ProteinsForDiseaseCardContainer);
