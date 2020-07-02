import { Context, ContextObj } from "../types/context";
import { html } from "lit-html";

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

export const createTableLink = (
  diseaseId: string,
  toContext: Context,
  count: number
) => ({
  name: `${count} ${ContextObj[toContext as keyof typeof ContextObj].label}${
    count > 1 ? "s" : ""
  }`,
  link: `/disease/${diseaseId}/${
    ContextObj[toContext as keyof typeof ContextObj].id
  }`,
  color: ContextObj[toContext as keyof typeof ContextObj].color,
});

export const getTableLink = (
  diseaseId: string,
  id: string,
  fromContext: Context,
  toContext: Context,
  count: number
) => {
  const { name, link } = createLink(
    diseaseId,
    id,
    fromContext,
    toContext,
    count
  );
  return html`<a href="${link}">${name}</a>`;
};
