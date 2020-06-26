import React, { Fragment, FunctionComponent } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import useApi from "./UseApi";
import VariantCard, { VariantData, VariationData } from "./cards/VariantCard";
import PageTemplate from "../PageTemplate";
import { Context } from "../types/context";
import PageContainer from "../PageContainer";
import ProteinContainer from "./ProteinContainer";

const VariantsForProteinCardContainer: FunctionComponent<RouteComponentProps<
  any
>> = ({ match }) => {
  const { id } = match.params;
  const { data, isLoading } = useApi<VariationData>(
    `https://www.ebi.ac.uk/proteins/api/variation/${id}?format=json`
  );
  let filteredData;
  if (data) {
    filteredData = {
      sequence: data.sequence,
      features: data.features.filter(
        (d: VariantData) =>
          d.sourceType.includes("uniprot") || d.sourceType.includes("mixed")
      ),
    };
  }

  return (
    <Fragment>
      <PageContainer
        leftColumn={<ProteinContainer id={id} />}
        rightColumn={
          <PageTemplate
            context={Context.VARIANT}
            id={id}
            length={filteredData && filteredData.features.length}
            isLoading={isLoading}
          >
            {filteredData && <VariantCard data={filteredData} />}
          </PageTemplate>
        }
      />
    </Fragment>
  );
};

export default withRouter(VariantsForProteinCardContainer);
