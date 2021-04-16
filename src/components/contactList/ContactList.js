import React, { useEffect } from "react";
import ContactListItem from "./ContactListItem";
import s from "./contacts.module.css";
import { connect } from "react-redux";
import { getContact } from "../../redux/contacts/contactsOperations";
import contactsSelectors from "../../redux/contacts/contactsSelectors";

const ContactList = ({ contacts, filter, getContact, isLoading }) => {
  useEffect(() => {
    getContact();
  }, []);

  const getFilteredContacts = () => {
    console.log(contacts, filter);
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      {isLoading && <h1>...Loading</h1>}
      <ul className={s.list}>
        {filteredContacts &&
          filteredContacts.map((contact) => (
            <ContactListItem key={contact.id} {...contact} />
          ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => ({
  contacts: contactsSelectors.getContacts(state),
  filter: contactsSelectors.getFilter(state),
  isLoading: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = { getContact };

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
