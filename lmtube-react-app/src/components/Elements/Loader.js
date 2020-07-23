import React from "react";

const Loader = (props) => {
  if (props.show) {
    return (
      <div className="loader">
        <div
          className="spinner-border loader-spinner text-success"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return "";
};

export default Loader;
