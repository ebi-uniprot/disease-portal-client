import { getDisease_disease } from "../generated-types/getDisease";

export const getDrugs = (disease: getDisease_disease) => {
  const drugs = disease.proteins
    ?.map((protein) =>
      protein.proteinCrossRefs?.map((proteinCrossRef) => proteinCrossRef.drugs)
    )
    .flat(2)
    .filter((drug) => drug);
  return drugs;
};
