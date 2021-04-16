import React, { Component } from "react";
import s from "./contactForm.module.css";
import { connect } from "react-redux";
import contactOperations from "../../redux/contacts/contactsOperations";
import contactsSelectors from "../../redux/contacts/contactsSelectors";

class ContactForm extends Component {
  state = {
    name: "",
    number: "",
  };

  // handleImputName = (e) => {
  //   console.log(e.target.value);
  //   this.setState({ name: e.target.value });
  // };

  // handleImputNumber = (e) => {
  //   console.log(e.target.value);
  //   this.setState({ number: e.target.value });
  // };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkFullIsForm = (name, number) => {
    if ((name.length > 0) & (number.length > 0)) {
      return true;
    } else {
      alert(`form is not full`);
      return false;
    }
  };

  checkUnique = (name, number) => {
    const { contacts } = this.props;

    if (contacts.length > 0) {
      const isExist = !!contacts.find(
        (contact) => contact.name === name || contact.number === number
      );
      isExist && alert(`${name || number} is already exist`);
      return !isExist;
    }
    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { onAdd } = this.props;
    const unique = this.checkUnique(name, number);

    const fullForm = this.checkFullIsForm(name, number);

    unique && fullForm && onAdd(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({
      name: "",
      number: "",
    });
  };

  render() {
    return (
      <>
        <form className={s.form} onSubmit={this.handleSubmit}>
          <label>
            Name
            <input
              className={s.input}
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Number
            <input
              className={s.input}
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleInputChange}
            />
          </label>
          <button className={s.button} type="submit">
            Add
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { contacts: contactsSelectors.getContacts(state) };
};

const mapDispatchToProps = (dispatch) => ({
  onAdd: (name, number) => dispatch(contactOperations.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
