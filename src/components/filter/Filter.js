import React from "react";
import s from "./filter.module.css";
import { connect } from "react-redux";
import { changeFilter } from "../../redux/contacts/contactsActions";
import contactsSelector from "../../redux/contacts/contactsSelectors";

const Filter = ({ changeFilter, filter }) => {
  const handleChangeFilter = (e) => {
    changeFilter(e.target.value);
  };

  return (
    <>
      <label>
        <input
          className={s.input}
          type="text"
          value={filter}
          onChange={handleChangeFilter}
        />
      </label>
    </>
  );
};

const mapStateToProps = (state) => {
  return { filter: contactsSelector.getFilter(state) };
};

const mapDispatchToProps = { changeFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
