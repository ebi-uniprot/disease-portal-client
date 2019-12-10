import React, { Fragment, FC, ReactNode } from "react";
import { Context } from "./types/context";
import { colors } from "./config";
import spinner from "./svg/spinner.svg";
import "./PageTemplate.css";

const PageTemplate: FC<{
  context: Context;
  id: string;
  length: number;
  isLoading: boolean;
  children: ReactNode;
}> = ({ context, id, length, children, isLoading }) => {
  if (isLoading || !length) {
    return (
      <div className="spinner-container">
        <img src={spinner} alt="logo" width={120} height={50} />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="page-header">
        <h2 style={{ borderBottom: `1px solid ${colors.get(context)}` }}>
          {length} {context.toLowerCase()}
          {length > 1 && "s"} for {id}
        </h2>
      </div>
      {children}
    </Fragment>
  );
};

export default PageTemplate;
