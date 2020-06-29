import React, { FC } from "react";

import "./ThreePartGrid.css";

const ThreePartGrid: FC<{
  top: JSX.Element;
  left: JSX.Element;
  right: JSX.Element;
}> = ({ top, left, right }) => (
  <section className="three-grid">
    <section className="three-grid__top">{top}</section>
    <section className="three-grid__left">{left}</section>
    <section className="three-grid__right">{right}</section>
  </section>
);

export default ThreePartGrid;
