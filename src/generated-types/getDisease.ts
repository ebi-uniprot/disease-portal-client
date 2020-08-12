/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDisease
// ====================================================

export interface getDisease_disease_children_proteins {
  __typename: "Protein";
  proteinId: string;
}

export interface getDisease_disease_children_children_children {
  __typename: "Disease";
  diseaseName: string;
}

export interface getDisease_disease_children_children {
  __typename: "Disease";
  children: getDisease_disease_children_children_children[] | null;
  diseaseName: string;
}

export interface getDisease_disease_children {
  __typename: "Disease";
  diseaseName: string;
  proteins: getDisease_disease_children_proteins[] | null;
  children: getDisease_disease_children_children[] | null;
}

export interface getDisease_disease_proteins_proteinCrossRefs_drugs {
  __typename: "Drug";
  name: string | null;
}

export interface getDisease_disease_proteins_proteinCrossRefs {
  __typename: "ProteinCrossRef";
  drugs: getDisease_disease_proteins_proteinCrossRefs_drugs[] | null;
}

export interface getDisease_disease_proteins {
  __typename: "Protein";
  proteinId: string;
  proteinCrossRefs: getDisease_disease_proteins_proteinCrossRefs[] | null;
}

export interface getDisease_disease_variants {
  __typename: "Variant";
  cvId: string | null;
}

export interface getDisease_disease {
  __typename: "Disease";
  diseaseId: string;
  diseaseName: string;
  description: string | null;
  children: getDisease_disease_children[] | null;
  proteins: getDisease_disease_proteins[] | null;
  variants: getDisease_disease_variants[] | null;
}

export interface getDisease {
  /**
   * Get a disease by diseaseId
   */
  disease: getDisease_disease | null;
}

export interface getDiseaseVariables {
  id: string;
}
