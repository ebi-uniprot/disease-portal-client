import React, { FC } from "react";
import ProtvistaDatatable from "protvista-datatable";
import { loadWebComponent } from "../cards/VariantCard";
import { ContextObj, Context } from "../../types/context";
import { Link } from "react-router-dom";

export type DiseaseVariant = {
  proteinAccession: string;
  altSeq: string;
  featureId: string;
  featureLocation: {
    startModifier: string;
    endModifier: string;
    startId: number;
    endId: number;
  };
  featureStatus: string;
  origSeq: string;
  report: string;
};

loadWebComponent("protvista-datatable", ProtvistaDatatable);

const VariantsTable: FC<{ data: DiseaseVariant[]; diseaseId: string }> = ({
  data,
  diseaseId,
}) => (
  <section className="full-width">
    <p>UniProt curated variants for {diseaseId}</p>
    <protvista-datatable height="100%">
      <table>
        <thead>
          <tr>
            <th>Protein</th>
            <th>Position</th>
            <th>Variation</th>
            <th>Feature ID</th>
            <th>Status</th>
            <th>Report</th>
          </tr>
        </thead>
        <tbody>
          {data.map((variant) => (
            <tr
              data-id={`${variant}`}
              key={`${variant.featureLocation.startId}${variant.altSeq}`}
            >
              <td>
                <Link
                  to={`/${ContextObj[Context.DISEASE].id}/${diseaseId}/${
                    ContextObj[Context.PROTEIN].id
                  }/${variant.proteinAccession}/${
                    ContextObj[Context.PROTEIN].id
                  }`}
                >
                  {variant.proteinAccession}
                </Link>
              </td>
              <td>{variant.featureLocation.startId}</td>
              <td>
                {variant.origSeq}
                {` -> `}
                {variant.altSeq}
              </td>
              <td>{variant.featureId}</td>
              <td>{variant.featureStatus}</td>
              <td>{variant.report}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </protvista-datatable>
  </section>
);

export default VariantsTable;
