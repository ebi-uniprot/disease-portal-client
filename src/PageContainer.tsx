import React, { FC } from "react";
import "./PageContainer.css";

const PageContainer: FC<{
  leftColumn: JSX.Element;
  rightColumn: JSX.Element;
}> = ({ leftColumn, rightColumn }) => (
  <div className="page-container">
    <div className="page-container__column">{leftColumn}</div>
    <div className="page-container__column">{rightColumn}</div>
  </div>
);

export default PageContainer;
