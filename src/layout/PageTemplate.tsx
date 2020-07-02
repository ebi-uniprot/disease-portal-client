import React, { FC, ReactNode } from "react";
import { Context, ContextObj } from "../types/context";
import spinner from "../svg/spinner.svg";
import "./PageTemplate.css";

const PageTemplate: FC<{
  context: Context;
  id: string;
  length?: number;
  isLoading: boolean;
  children: ReactNode;
}> = ({ context, id, length, children, isLoading }) => {
  if (isLoading || !length) {
    return (
      <section className="spinner-container">
        <img src={spinner} alt="logo" width={120} height={50} />
      </section>
    );
  }

  return (
    <section>
      <div className="page-header">
        <h5
          style={{
            borderBottom: `1px solid ${
              ContextObj[context as keyof typeof ContextObj].color
            }`,
          }}
        >
          {length} {context.toLowerCase()}
          {length > 1 && "s"} for {id}
        </h5>
      </div>
      {children}
    </section>
  );
};

export default PageTemplate;
