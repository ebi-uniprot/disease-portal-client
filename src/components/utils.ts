import { Context } from "../types/context";
import { colors } from "../config";

export const generateLink = (
  fromContext: Context,
  toContext: Context,
  fromId: string,
  toItems: any[]
) => {
  return {
    name: `${toItems.length} ${toContext.toLowerCase()}${
      toItems.length > 1 ? "s" : ""
    }`,
    link: `/${toContext}/${fromId}/${fromContext}`,
    color: colors.get(toContext),
  };
};

export const getProteinLink = (
  diseaseId: string,
  accession: string,
  type: string,
  count: number
) => ({
  name: `${count} ${type}${count > 1 ? "s" : ""}`,
  link: `/disease/${diseaseId}/proteins/${accession}/${type}`,
  color: colors.get(Context.INTERACTION),
});
