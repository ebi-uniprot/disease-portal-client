import React from "react";
import { ApolloError } from "@apollo/client";
import { Message } from "franklin-sites";
import spinner from "../svg/spinner.svg";

const ResponseHandler: React.FC<{
  loading: boolean;
  error: undefined | ApolloError;
  data: any;
  children: JSX.Element;
}> = ({ loading, error, data, children }) => {
  if (loading) {
    return (
      <section className="spinner-container">
        <img src={spinner} alt="logo" width={120} height={50} />
      </section>
    );
  } else if (error) {
    return <Message level="error">Error: {error}</Message>;
  } else if (data) {
    return <>{children}</>;
  }
  return null;
};

export default ResponseHandler;
