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
    color: colors[toContext]
  };
};
