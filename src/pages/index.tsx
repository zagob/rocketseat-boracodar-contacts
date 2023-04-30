import { Contact } from "@/components/Contact";
import { Content } from "@/components/Content";
import { Header } from "@/components/Header";
import { RootState } from "@/store";
import {
  activeDeleteContact,
  activeEditContact,
  cleanSearchContacts,
  createContactWithLocalStorageExist,
  deleteContactSelected,
} from "@/store/reducers/reducerStateContacts";
import { Roboto } from "next/font/google";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "300", "700"] });

export default function Home() {
  const dispatch = useDispatch();
  const { contacts, isActiveSearch, contactEdit, contactDelete } = useSelector(
    (store: RootState) => {
      const { contacts, searchContacts, contactEdit, contactDelete } =
        store.stateContactsSlice;

      const filteredContacts = contacts.filter(
        (item) =>
          item.name.includes(searchContacts) ||
          item.number.includes(searchContacts)
      );

      return {
        contacts: filteredContacts,
        isActiveSearch: searchContacts.length > 0,
        contactEdit,
        contactDelete,
      };
    }
  );

  useEffect(() => {
    const contactsLocalStorage = localStorage.getItem("contactsPage");

    if (contactsLocalStorage) {
      dispatch(
        createContactWithLocalStorageExist(JSON.parse(contactsLocalStorage))
      );
    }
  }, []);

  return (
    <div style={roboto.style} className="flex flex-col min-h-screen">
      <Header />
      <Content>
        <div className="grid grid-cols-3">
          {isActiveSearch ? (
            <button
              onClick={() => dispatch(cleanSearchContacts(""))}
              type="button"
              className="text-red-700 text-sm text-left"
            >
              Limpar busca
            </button>
          ) : (
            <div />
          )}

          {contactEdit.isActive && (
            <span className="text-right text-blue-500 text-sm col-span-2">
              Selecione um contato para editar.
              <button
                type="button"
                onClick={() => dispatch(activeEditContact(false))}
                className="text-red-700 pl-2 underline"
              >
                cancelar
              </button>
            </span>
          )}

          {contactDelete.isActive && (
            <span className="text-right text-red-500 text-sm col-span-2">
              Selecione um ou mais contatos para excluir.
              <button
                type="button"
                onClick={() => dispatch(activeDeleteContact(false))}
                className="text-red-100 pl-2 underline"
              >
                cancelar
              </button>
            </span>
          )}
        </div>
        <div className="space-y-8 h-[450px] overflow-x-hidden overflow-y-auto relative mt-4">
          {contacts.map((item, index) => (
            <Contact key={index} data={item} />
          ))}
        </div>

        {contactDelete.isActive && (
          <div className="grid grid-cols-2 gap-10">
            <button
              type="button"
              className="rounded bg-zinc-800 py-2 border border-transparent hover:brightness-110 transition-all"
            >
              Excluir tudo
            </button>
            <button
              type="button"
              onClick={() => dispatch(deleteContactSelected())}
              className="rounded py-2 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              Excluir selecionados
            </button>
          </div>
        )}
      </Content>
    </div>
  );
}
