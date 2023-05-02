import { createContact } from "@/store/reducers/reducerStateContacts";
import { Modal } from "../Modal";
import { Plus } from "phosphor-react";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { FormModal } from "../FormModal";

export function ModalAddContact() {
  const nameRef = useRef<HTMLInputElement>(null);
  const urlAvatarRef = useRef<HTMLInputElement>(null);
  const dddRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);

  const { contacts } = useSelector((store: RootState) => {
    const { contacts } = store.stateContactsSlice;

    return {
      contacts,
    };
  });

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  async function handleAddContact(event: FormEvent) {
    event.preventDefault();

    const name = nameRef.current?.value ?? "";
    const urlAvatar = urlAvatarRef.current?.value ?? "";
    const ddd = dddRef.current?.value ?? "";
    const phone = telRef.current?.value ?? "";

    if (name.length < 2 || ddd.length < 2 || phone.length < 11) {
      alert("Nome e numero obrigatorios");
      return;
    }

    const data = {
      name,
      number: ddd.concat(phone),
      urlAvatar,
    };

    const existSameNameOrNumberInContacts = contacts.find(
      (item) => item.name === data.name || item.number === data.number
    );

    if (existSameNameOrNumberInContacts) {
      return alert("Ja existe um nome ou numero igual ao cadastrado!");
    }

    dispatch(createContact(data));
    setShowModal(false);
  }

  return (
    <Modal
      showModal={showModal}
      onCloseModalOff={() => setShowModal(false)}
      title="Adicionar Contato"
      titleButton={
        <Plus
          onClick={() => setShowModal(true)}
          size={24}
          className="hover:brightness-125 cursor-pointer transition-all"
        />
      }
    >
      <FormModal
        onHandleSubmit={handleAddContact}
        nameRef={nameRef}
        urlAvatarRef={urlAvatarRef}
        dddRef={dddRef}
        telRef={telRef}
      />
    </Modal>
  );
}
