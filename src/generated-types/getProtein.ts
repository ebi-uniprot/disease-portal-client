/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getProtein
// ====================================================

export interface getProtein_protein_diseases {
  __typename: "Disease";
  diseaseName: string;
}

export interface getProtein_protein_proteinCrossRefs {
  __typename: "ProteinCrossRef";
  primaryId: string | null;
}

export interface getProtein_protein_interactions {
  __typename: "Interaction";
  accession: string | null;
}

export interface getProtein_protein_variants {
  __typename: "Variant";
  type: string | null;
}

export interface getProtein_protein {
  __typename: "Protein";
  proteinName: string;
  proteinId: string;
  accession: string;
  gene: string | null;
  description: string | null;
  diseases: getProtein_protein_diseases[] | null;
  proteinCrossRefs: getProtein_protein_proteinCrossRefs[] | null;
  interactions: getProtein_protein_interactions[] | null;
  variants: getProtein_protein_variants[] | null;
}

export interface getProtein {
  /**
   * Get a protein by accession
   */
  protein: getProtein_protein | null;
}

export interface getProteinVariables {
  proteinid: string;
}
