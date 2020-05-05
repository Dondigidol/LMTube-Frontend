import React from "react";

class SearchForm extends React.Component {
  render() {
    return (
      <form className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Поиск"
          aria-label="Поиск"
          name="title"
        />
        <button></button>
      </form>
    );
  }
}

export default SearchForm;
