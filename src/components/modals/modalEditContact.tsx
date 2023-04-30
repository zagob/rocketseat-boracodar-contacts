import {
  createContact,
  editContactSelected,
  selectContactEdit,
} from "@/store/reducers/reducerStateContacts";
import { Modal } from "../Modal";
import { Plus } from "phosphor-react";
import { FormEvent, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

interface ModalEditContactProps {
  contact: {
    name: string;
    number: string;
    urlAvatar: string;
  };
}

export function ModalEditContact({ contact }: ModalEditContactProps) {
  const { contacts } = useSelector((store: RootState) => {
    const { contacts } = store.stateContactsSlice;

    return {
      contacts,
    };
  });

  const dispatch = useDispatch();
  const [name, setName] = useState(contact.name);
  const [ddd, setDdd] = useState(contact.number.substring(0, 2));
  const [number, setNumber] = useState(contact.number.substring(2));
  const [urlAvatar, setUrlAvatar] = useState(contact.urlAvatar);
  const [showModal, setShowModal] = useState(false);

  function cleanInputs() {
    setUrlAvatar("");
    setNumber("");
    setDdd("");
    setName("");
  }

  async function handleAddContact(event: FormEvent) {
    event.preventDefault();

    if (name.length < 2 || ddd.length < 2 || number.length < 11) {
      alert("Nome e numero obrigatorios");
      return;
    }

    const data = {
      name,
      number: ddd.concat(number),
      urlAvatar,
    };

    dispatch(editContactSelected(data));
    setShowModal(false);
  }

  function handleOpenModalEditContact() {
    dispatch(selectContactEdit(contact.name));
    setShowModal(true);
  }

  return (
    <Modal
      showModal={showModal}
      onCloseModalOff={() => setShowModal(false)}
      title="Editar Contato"
      titleButton={
        <div
          className="absolute w-full h-full"
          onClick={handleOpenModalEditContact}
        />
      }
    >
      <form onSubmit={handleAddContact} className="w-[400px]">
        <div className="grid">
          <label htmlFor="">Nome:</label>
          <input
            type="text"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-none bg-zinc-800 text-zinc-200 px-2 rounded h-8"
          />
        </div>
        <div className="grid">
          <label htmlFor="">URL Avatar:</label>
          <input
            type="text"
            defaultValue={urlAvatar}
            onChange={(e) => setUrlAvatar(e.target.value)}
            className="outline-none border-none bg-zinc-800 text-zinc-200 px-2 rounded h-8"
          />
        </div>
        <div className="grid grid-cols-8 gap-2">
          <div className="grid col-span-2">
            <label htmlFor="">DDD:</label>
            <input
              type="text"
              minLength={2}
              maxLength={2}
              placeholder="DDD"
              defaultValue={ddd}
              onChange={(e) => {
                const value = e.target.value;
                if (isNaN(Number(value))) {
                  return;
                }
                setDdd(value);
              }}
              className="outline-none w-full border-none bg-zinc-800 placeholder:opacity-40 text-zinc-200 px-2 rounded h-8"
            />
          </div>
          <div className="grid col-span-6">
            <label htmlFor="">Telefone:</label>
            <input
              type="text"
              minLength={11}
              maxLength={11}
              placeholder="(dd) 99999-9999"
              defaultValue={number}
              onChange={(e) => {
                const value = e.target.value;
                if (isNaN(Number(value))) {
                  return;
                }
                setNumber(value);
              }}
              className="outline-none w-full border-none bg-zinc-800 placeholder:opacity-40 text-zinc-200 px-2 rounded h-8"
            />
          </div>
        </div>

        <button
          type="submit"
          className="border border-zinc-800 mt-6 px-3 h-8 bg-zinc-400 rounded hover:brightness-110 transition-all"
        >
          Editar
        </button>
      </form>
    </Modal>
  );
}
