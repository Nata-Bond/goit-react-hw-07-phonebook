const getContacts = (state) => state.contacts.items;
const getLoading = (state) => state.contacts.loading;
const getFilter = (state) => state.contacts.filter;

export default { getContacts, getLoading, getFilter };
