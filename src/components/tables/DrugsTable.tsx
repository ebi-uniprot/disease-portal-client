import React, { FunctionComponent } from "react";
import ProtvistaDatatable from "protvista-datatable";

import { DrugsData } from "../cards/DrugsCard";
import { loadWebComponent } from "../cards/VariantCard";
import { Context, ContextObj } from "../../types/context";

loadWebComponent("protvista-datatable", ProtvistaDatatable);

const DrugsTable: FunctionComponent<{
  data: DrugsData[];
  diseaseId: string;
}> = ({ data, diseaseId }) => {
  return (
    <section className="full-width">
      <p>
        Drugs related to proteins associated with Alzheimer’s disease. Source:{" "}
        <a
          href="https://www.ebi.ac.uk/chembl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Chembl
        </a>
        ,{" "}
        <a
          href="https://www.opentargets.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Targets
        </a>
      </p>
      <protvista-datatable height="100%">
        <table>
          <thead>
            <tr>
              <th data-filter="drug_name">Name</th>
              <th data-filter="drug_phase">Phase</th>
              <th>Molecule Type</th>
              <th>Mechanism of action</th>
              <th data-filter="drug_protein">Target</th>
              <th>Cross Reference</th>
              <th>Disease</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {data.map((drug) => (
              <tr
                key={`${drug.name}${drug.proteinAccession}${drug.mechanismOfAction}`}
              >
                <td data-filter="drug_name" data-filter-value={drug.name}>
                  {drug.name}
                </td>
                <td
                  data-filter="drug_phase"
                  data-filter-value={drug.maxTrialPhase}
                >
                  {drug.clinicalTrialLink ? (
                    <a
                      href={drug.clinicalTrialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Phase {drug.maxTrialPhase}
                    </a>
                  ) : (
                    <>Phase {drug.maxTrialPhase}</>
                  )}
                </td>
                <td>{drug.moleculeType}</td>
                <td>{drug.mechanismOfAction}</td>
                <td data-filter="drug_protein">
                  <a
                    href={`/${ContextObj[Context.DISEASE].id}/${diseaseId}/${
                      ContextObj[Context.PROTEIN].id
                    }/${drug.proteinAccession}/${
                      ContextObj[Context.PROTEIN].id
                    }`}
                  >
                    {drug.proteinAccession}
                  </a>
                </td>
                <td>
                  {drug.sourceIds.map((sourceId) => (
                    <a
                      href={`//www.ebi.ac.uk/chembl/compound_report_card/${sourceId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={sourceId}
                    >
                      {sourceId}
                    </a>
                  ))}
                </td>
                <td>
                  {drug.disease.proteinCount &&
                  drug.disease.proteinCount > 0 ? (
                    <p key={drug.disease.diseaseId}>
                      <a
                        href={`/${ContextObj[Context.DISEASE].id}/${
                          drug.disease.diseaseId
                        }/${ContextObj[Context.PROTEIN].id}`}
                      >
                        {drug.disease.diseaseName}
                      </a>
                    </p>
                  ) : drug.disease.diseaseName.match("http") ? (
                    <p key={drug.disease.diseaseId}>
                      <a
                        href={drug.disease.diseaseName}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {drug.disease.diseaseName}
                      </a>
                    </p>
                  ) : (
                    <p key={drug.disease.diseaseId}>
                      {drug.disease.diseaseName}
                    </p>
                  )}
                </td>
                <td>
                  {drug.evidences?.map((evidence) => (
                    <div key={evidence}>
                      <a
                        href={evidence}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        EuropePMC
                      </a>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </protvista-datatable>
    </section>
  );
};

export default DrugsTable;
