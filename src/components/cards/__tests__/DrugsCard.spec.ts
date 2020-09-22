import { sortDiseases } from "../DrugsCard";

describe("DrugsCard tests", () => {
  it("sort diseases", () => {
    const diseases = [
      {
        diseaseId: "Disease 1",
        diseaseName: "Disease 1",
        proteinCount: 0,
      },
      {
        diseaseId: "Disease 3",
        diseaseName: "Disease 3",
        proteinCount: 10,
      },
      {
        diseaseId: "Disease 2",
        diseaseName: "Disease 2",
        proteinCount: 2,
      },
      {
        diseaseId: "Disease 4",
        diseaseName: "Disease 4",
        proteinCount: 0,
      },
    ];

    const sorted = sortDiseases(diseases);
    expect(sorted).toEqual([
      { diseaseId: "Disease 2", diseaseName: "Disease 2", proteinCount: 2 },
      {
        diseaseId: "Disease 3",
        diseaseName: "Disease 3",
        proteinCount: 10,
      },
      { diseaseId: "Disease 1", diseaseName: "Disease 1", proteinCount: 0 },
      { diseaseId: "Disease 4", diseaseName: "Disease 4", proteinCount: 0 },
    ]);
  });

  it("sort diseases even when all counts 0", () => {
    const diseases = [
      {
        diseaseId: "Disease 1",
        diseaseName: "Disease 1",
        proteinCount: 0,
      },
      {
        diseaseId: "Disease 4",
        diseaseName: "Disease 4",
        proteinCount: 0,
      },
    ];

    const sorted = sortDiseases(diseases);
    expect(sorted).toEqual([
      { diseaseId: "Disease 1", diseaseName: "Disease 1", proteinCount: 0 },
      { diseaseId: "Disease 4", diseaseName: "Disease 4", proteinCount: 0 },
    ]);
  });
});
