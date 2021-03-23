export const diseasesUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/diseases/${id}`;
export const proteinsUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/proteins/${id}`;

export const diseasesForProteinsUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/protein/${id}/diseases`;

export const diseasesForDrugUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/drug/${id}/diseases`;

export const drugsForDiseaseUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/disease/${id}/drugs`;

export const drugsForProteinUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/protein/${id}/drugs`;

export const interactionsForProteinUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/protein/${id}/interactions`;

export const pathwaysForProteinUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/protein/${id}/xrefs`;

export const proteinsForDiseaseUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/disease/${id}/proteins`;

export const proteinsForDrugUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/drug/${id}/proteins`;

export const variantsForDiseaseUrl = (id: string) =>
  `${process.env.REACT_APP_API_URL}/disease/${id}/variants`;

export const variantsForProteinUrl = (id: string) =>
  `https://www.ebi.ac.uk/proteins/api/variation/${id}?format=json`;

export const featuresForProteinUrl = (id: string) =>
  `https://www.ebi.ac.uk/proteins/api/features/${id}?format=json`;

export const orthologuesForProteinUrl = (id: string) =>
  `http://wwwdev.ebi.ac.uk/uniprot/api/diseaseservice/ortholog-mappings/${id}`;
