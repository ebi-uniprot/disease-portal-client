import React, { FunctionComponent } from "react";
import ProtvistaDatatable from "protvista-datatable";

import { DrugsData, sortDiseases } from "../cards/DrugsCard";
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
              <tr key={drug.name}>
                <td data-filter="drug_name">{drug.name}</td>
                <td data-filter="drug_phase">
                  {drug.clinicalTrialLink ? (
                    <a
                      href={drug.clinicalTrialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Phase {drug.clinicalTrialPhase}
                    </a>
                  ) : (
                    <>Phase {drug.clinicalTrialPhase}</>
                  )}
                </td>
                <td>{drug.moleculeType}</td>
                <td>{drug.mechanismOfAction}</td>
                <td data-filter="drug_protein">
                  {drug.proteins?.map((protein) => (
                    <p key={protein}>
                      <a
                        href={`/${
                          ContextObj[Context.DISEASE].id
                        }/${diseaseId}/${
                          ContextObj[Context.PROTEIN].id
                        }/${protein}/${ContextObj[Context.PROTEIN].id}`}
                      >
                        {protein}
                      </a>
                    </p>
                  ))}
                </td>
                <td>
                  <a
                    href={`//www.ebi.ac.uk/chembl/compound_report_card/${drug.sourceId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {drug.sourceId}
                  </a>
                </td>
                <td>
                  {drug.diseases && (
                    <div style={{ overflowY: "auto", height: "10vh" }}>
                      {sortDiseases(drug.diseases).map((disease) => {
                        return disease.proteinCount &&
                          disease.proteinCount > 0 ? (
                          <p key={disease.diseaseId}>
                            <a
                              href={`/${ContextObj[Context.DISEASE].id}/${
                                disease.diseaseId
                              }/${ContextObj[Context.PROTEIN].id}`}
                            >
                              {disease.diseaseName}
                            </a>
                          </p>
                        ) : disease.diseaseName.match("http") ? (
                          <p key={disease.diseaseId}>
                            <a
                              href={disease.diseaseName}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {disease.diseaseName}
                            </a>
                          </p>
                        ) : (
                          <p key={disease.diseaseId}>{disease.diseaseName}</p>
                        );
                      })}
                    </div>
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
