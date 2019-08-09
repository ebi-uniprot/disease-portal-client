import React, { Fragment, FC, Children, ReactNode } from "react";
import { StickyContainer, Sticky } from "react-sticky";
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
      <StickyContainer>
        <Sticky>
          {({ style }) => (
            <div className="page-header" style={style}>
              <h2 style={{ borderBottom: `1px solid ${colors[context]}` }}>
                {length} {context.toLowerCase()}
                {length > 1 && "s"} for {id}
              </h2>
            </div>
          )}
        </Sticky>
        {children}
      </StickyContainer>
    </Fragment>
  );
};

export default PageTemplate;
