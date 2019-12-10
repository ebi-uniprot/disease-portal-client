import { Context } from "./types/context";

export const colorsOld: { [key in keyof typeof Context]: string } = {
  PROTEIN: "blue",
  DISEASE: "red",
  VARIANT: "orange",
  PATHWAY: "green",
  DRUG: "yellow",
  INTERACTION: "pink",
  SEARCH: ""
};

export const colors = new Map([
  [Context.PROTEIN, "blue"],
  [Context.DISEASE, "red"],
  [Context.VARIANT, "orange"],
  [Context.PATHWAY, "green"],
  [Context.DRUG, "yellow"],
  [Context.INTERACTION, "pink"]
]);

export const baseUrl = "//wwwdev.ebi.ac.uk/uniprot/api/diseaseservice";
