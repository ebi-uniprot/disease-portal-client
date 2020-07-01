import { Context, ContextObj } from "../types/context";

export const createLink = (
  diseaseId: string,
  id: string,
  fromContext: Context,
  toContext: Context,
  count: number
) => ({
  name: `${count} ${ContextObj[toContext as keyof typeof ContextObj].label}${
    count > 1 ? "s" : ""
  }`,
  link: `/disease/${diseaseId}/${
    ContextObj[fromContext as keyof typeof ContextObj].id
  }/${id}/${ContextObj[toContext as keyof typeof ContextObj].id}`,
  color: ContextObj[toContext as keyof typeof ContextObj].color,
});
