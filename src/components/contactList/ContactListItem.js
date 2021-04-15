import React from "react";
import s from "./contacts.module.css";
import { connect } from "react-redux";
import { deleteContact } from "../../redux/contacts/contactsOperations";

const ContactListItem = ({ name, number, id, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(id);
  };

  return (
    <li className={s.listItem}>
      <span>
        {name} : {number}
      </span>
      <button className={s.button} type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};

const mapDispatchToProps = { deleteContact };

export default connect(null, mapDispatchToProps)(ContactListItem);
