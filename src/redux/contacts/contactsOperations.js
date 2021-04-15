import axios from "axios";
import {
  addContactRequest,
  addContactSuccess,
  addContactError,
  getContactRequest,
  getContactSuccess,
  getContactError,
  deleteContactRequest,
  deleteContactSuccess,
  deleteContactError,
} from "./contactsActions";

axios.defaults.baseURL = "http://localhost:3001";

export const getContact = () => async (dispatch) => {
  dispatch(getContactRequest());

  try {
    const { data } = await axios.get("/contacts");
    dispatch(getContactSuccess(data));
  } catch (error) {
    dispatch(getContactError(error));
  }
};

const addContact = ({ name, number }) => async (dispatch) => {
  const contact = {
    name,
    number,
  };
  dispatch(addContactRequest());
  try {
    const { data } = await axios.post("/contacts", contact);
    dispatch(addContactSuccess(data));
  } catch (error) {
    dispatch(addContactError(error));
  }
};

export const deleteContact = (id) => async (dispatch) => {
  dispatch(deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(deleteContactSuccess(id));
  } catch (error) {
    dispatch(deleteContactError(error));
  }

  dispatch(getContactRequest());
  try {
    const { data } = await axios.get("/contacts");
    dispatch(getContactSuccess(data));
  } catch (error) {
    dispatch(getContactError(error));
  }
};
export default { addContact };

// export const getContact = () => async (dispatch) => {
//   dispatch(getContactRequest());

//   await axios
//     .get("/contacts")
//     .then((response) => dispatch(getContactSuccess(response.data)))
//     .catch((error) => dispatch(getContactError(error)));
// };

// const addContact = ({ name, number }) => async (dispatch) => {
//   const contact = {
//     name,
//     number,
//   };
//   dispatch(addContactRequest());
//   await axios
//     .post("/contacts", contact)
//     .then((response) => dispatch(addContactSuccess(response.data)))
//     .catch((error) => dispatch(addContactError(error)));
// };

// export const deleteContact = (id) => async (dispatch) => {
//   dispatch(deleteContactRequest());
//   await axios
//     .delete(`/contacts/${id}`)
//     .then(() => dispatch(deleteContactSuccess(id)))
//     .catch((error) => dispatch(deleteContactError(error)));

//   dispatch(getContactRequest());
//   axios
//     .get("/contacts")
//     .then((response) => dispatch(getContactSuccess(response.data)))
//     .catch((error) => dispatch(getContactError(error)));
// };
