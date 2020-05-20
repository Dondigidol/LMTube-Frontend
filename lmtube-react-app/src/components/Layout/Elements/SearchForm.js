import React from "react";

const SearchForm = (props) => {
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={props.searchingMethod}>
      <input
        className="form-control mr-sm-2"
        type="text"
        placeholder="Поиск"
        name="mask"
      />
    </form>
  );
};

export default SearchForm;
