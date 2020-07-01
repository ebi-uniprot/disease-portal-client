export enum Context {
  SEARCH = "SEARCH",
  DISEASE = "DISEASE",
  PROTEIN = "PROTEIN",
  VARIANT = "VARIANT",
  INTERACTION = "INTERACTION",
  PATHWAY = "PATHWAY",
  DRUG = "DRUG",
}

export const ContextObj = {
  DISEASE: {
    id: "disease",
    label: "Disease",
    color: "red",
  },
  PROTEIN: {
    id: "protein",
    label: "Protein",
    color: "blue",
  },
  VARIANT: {
    id: "variant",
    label: "Sequence variant",
    color: "orange",
  },
  INTERACTION: {
    id: "interaction",
    label: "Interaction",
    color: "pink",
  },
  PATHWAY: {
    id: "pathway",
    label: "Pathway",
    color: "green",
  },
  DRUG: {
    id: "drug",
    label: "Drug candidate",
    color: "yellow",
  },
};
