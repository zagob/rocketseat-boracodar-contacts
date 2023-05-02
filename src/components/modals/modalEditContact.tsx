import {
  editContactSelected,
  selectContactEdit,
} from "@/store/reducers/reducerStateContacts";
import { Modal } from "../Modal";
import { Plus } from "phosphor-react";
import { FormEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { FormModal } from "../FormModal";

interface ModalEditContactProps {
  contact: {
    name: string;
    number: string;
    urlAvatar: string;
  };
}

export function ModalEditContact({ contact }: ModalEditContactProps) {
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

  async function handleEditContact(event: FormEvent) {
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
      <FormModal
        onHandleSubmit={handleEditContact}
        nameRef={nameRef}
        urlAvatarRef={urlAvatarRef}
        dddRef={dddRef}
        telRef={telRef}
        nameValueDefault={contact.name}
        urlAvatarValueDefault={contact.urlAvatar}
        dddValueDefault={contact.number.substring(0, 2)}
        telValueDefault={contact.number.substring(2)}
      />
    </Modal>
  );
}
