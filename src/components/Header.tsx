import { Pencil, Trash, MagnifyingGlass } from "phosphor-react";

import { ModalAddContact } from "./modals/modalAddContact";
import { useDispatch, useSelector } from "react-redux";
import {
  activeDeleteContact,
  activeEditContact,
  searchContactData,
} from "@/store/reducers/reducerStateContacts";
import { RootState } from "@/store";

export function Header() {
  const dispatch = useDispatch();
  const { contacts, searchContacts, isDeleteActive, isEditActive } =
    useSelector((store: RootState) => {
      return {
        contacts: store.stateContactsSlice.contacts,
        searchContacts: store.stateContactsSlice.searchContacts,
        isEditActive: store.stateContactsSlice.contactEdit.isActive,
        isDeleteActive: store.stateContactsSlice.contactDelete.isActive,
      };
    });

  return (
    <header className="bg-[#16151E] h-40 pt-10 px-10">
      <div className="max-w-lg mx-auto text-zinc-100 space-y-4">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Meus contatos</h1>

          <div className="flex items-center gap-4">
            <ModalAddContact />
            <button
              type="button"
              disabled={contacts.length === 0 || isDeleteActive}
              className="hover:text-blue-400 hover:transition-all disabled:text-zinc-100 disabled:opacity-25 disabled:cursor-not-allowed"
              onClick={() => dispatch(activeEditContact(true))}
            >
              <Pencil size={24} />
            </button>
            <button
              disabled={contacts.length === 0 || isEditActive}
              className="hover:text-red-400 hover:transition-all disabled:text-zinc-100 disabled:opacity-25 disabled:cursor-not-allowed"
              type="button"
              onClick={() => dispatch(activeDeleteContact(true))}
            >
              <Trash size={24} />
            </button>
          </div>
        </div>

        <div className=" bg-[#24243D] w-full rounded-md z-0 relative">
          <MagnifyingGlass
            className="absolute left-10 bottom-1/2 translate-y-1/2"
            size={20}
          />
          <input
            type="text"
            value={searchContacts}
            onChange={(e) => dispatch(searchContactData(e.target.value.trim()))}
            placeholder="Busque por nome ou por dados de contato..."
            className="bg-transparent w-full outline-none border z-10 border-transparent pl-20 focus:border-zinc-500 rounded-md py-4 px-6 pr-10 text-md"
          />
        </div>
      </div>
    </header>
  );
}
