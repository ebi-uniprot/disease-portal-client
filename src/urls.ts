import { baseUrl } from "./config";

export const diseasesUrl = (id: string) => `${baseUrl}/diseases/${id}`;
export const proteinsUrl = (id: string) => `${baseUrl}/proteins/${id}`;

export const diseasesForProteinsUrl = (id: string) =>
  `${baseUrl}/protein/${id}/diseases`;

export const diseasesForDrugUrl = (id: string) =>
  `${baseUrl}/drug/${id}/diseases`;

export const drugsForDiseaseUrl = (id: string) =>
  `${baseUrl}/disease/${id}/drugs`;

export const drugsForProteinUrl = (id: string) =>
  `${baseUrl}/protein/${id}/drugs`;

export const interactionsForProteinUrl = (id: string) =>
  `${baseUrl}/protein/${id}/interactions`;

export const pathwaysForProteinUrl = (id: string) =>
  `${baseUrl}/protein/${id}/xrefs`;

export const proteinsForDiseaseUrl = (id: string) =>
  `${baseUrl}/disease/${id}/proteins`;

export const proteinsForDrugUrl = (id: string) =>
  `${baseUrl}/drug/${id}/proteins`;

export const variantsForDiseaseUrl = (id: string) =>
  `${baseUrl}/disease/${id}/variants`;

export const variantsForProteinUrl = (id: string) =>
  `https://www.ebi.ac.uk/proteins/api/variation/${id}?format=json`;
