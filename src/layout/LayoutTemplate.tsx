import React, { FC } from "react";

import "./LayoutTemplate.css";

const LayoutTemplate: FC<{
  header: JSX.Element;
  top: JSX.Element;
  left: JSX.Element;
  right: JSX.Element;
  footer: JSX.Element;
}> = ({ header, top, left, right, footer }) => (
  <section className="layout-template">
    <section className="layout-template__header">{header}</section>
    <section className="layout-template__top">{top}</section>
    <section className="layout-template__left">{left}</section>
    <section className="layout-template__right">{right}</section>
    <section className="layout-template__footer">{footer}</section>
  </section>
);

export default LayoutTemplate;
