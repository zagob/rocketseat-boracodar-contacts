import { createSlice, current } from "@reduxjs/toolkit";

interface Contact {
  name: string;
  number: string;
  urlAvatar: string;
}

export interface StateReducerContacts {
  contacts: Contact[];
  contactEdit: {
    isActive: boolean;
    idContactEdit: null | string;
  };
  contactDelete: {
    isActive: boolean;
    idsContactDelete: string[];
  };
  searchContacts: string;
}

const initialState: StateReducerContacts = {
  contacts: [] as Contact[],
  contactEdit: {
    isActive: false,
    idContactEdit: null,
  },
  contactDelete: {
    isActive: false,
    idsContactDelete: [],
  },
  searchContacts: "",
};

const stateContactsSlice = createSlice({
  name: "reducerStateContacts",
  initialState,
  reducers: {
    createContactWithLocalStorageExist: (
      state,
      { payload }: { payload: Contact[] }
    ) => {
      state.contacts = payload;
    },
    createContact: (state, { payload }: { payload: Contact }) => {
      state.contacts.unshift(payload);
    },
    searchContactData: (state, { payload }: { payload: string }) => {
      state.searchContacts = payload;
    },
    cleanSearchContacts: (state, {}) => {
      state.searchContacts = "";
    },
    activeEditContact: (state, { payload }) => {
      state.contactEdit.isActive = payload;
      state.contactEdit.idContactEdit = null;
    },
    selectContactEdit: (state, { payload }: { payload: string }) => {
      state.contactEdit.idContactEdit = payload;
    },

    activeDeleteContact: (state, { payload }) => {
      state.contactDelete.isActive = payload;
      state.contactDelete.idsContactDelete = [];
    },
    editContactSelected: (state, { payload }: { payload: Contact }) => {
      const { idContactEdit } = state.contactEdit;
      const contacts = current(state.contacts);
      const newContacts = contacts.map((contact) =>
        contact.name === idContactEdit ? payload : contact
      );

      state.contacts = newContacts;
    },
    selectContactDelete: (
      state,
      { payload }: { payload: { checked: boolean; id: string } }
    ) => {
      const { idsContactDelete } = state.contactDelete;

      if (!payload.checked) {
        state.contactDelete.idsContactDelete = idsContactDelete.filter(
          (item) => item !== payload.id
        );
        return;
      }

      state.contactDelete.idsContactDelete.push(payload.id);
    },
    deleteContactSelected: (state) => {
      state.contacts = state.contacts.filter(
        (contact) =>
          !state.contactDelete.idsContactDelete.includes(contact.name)
      );
      state.contactDelete.idsContactDelete = [];
    },
  },
});

export const {
  createContact,
  searchContactData,
  cleanSearchContacts,
  activeEditContact,
  selectContactEdit,
  editContactSelected,
  activeDeleteContact,
  selectContactDelete,
  deleteContactSelected,
  createContactWithLocalStorageExist,
} = stateContactsSlice.actions;

export default stateContactsSlice.reducer;
