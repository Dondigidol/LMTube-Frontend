import React from "react";
import Header from "../Elements/Header";

const PageNotFound = () => {
  return (
    <div>
      <Header />
      <div className="mt-3 row text-secondary">
        <div className="my-auto col-12 text-center">
          <p className="h4">Упс...</p>
          Страница не найдена.
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
