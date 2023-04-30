import { RootState } from "@/store";
import { selectContactDelete } from "@/store/reducers/reducerStateContacts";
import Image from "next/image";
import { UserCircle } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { ModalEditContact } from "./modals/modalEditContact";

interface ContactProps {
  data: {
    name: string;
    urlAvatar: string;
    number: string;
  };
}

export function Contact({ data }: ContactProps) {
  const dispatch = useDispatch();
  const { contactDelete, contactEdit } = useSelector((store: RootState) => {
    const { contactDelete, contactEdit } = store.stateContactsSlice;
    return {
      contactDelete,
      contactEdit,
    };
  });
  return (
    <div
      className={`flex items-center gap-20 relative p-2 rounded ${
        contactEdit.isActive && "hover:bg-zinc-800 hover:cursor-pointer"
      }`}
    >
      {contactEdit.isActive && <ModalEditContact contact={data} />}
      <div className="bg-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
        {data.name.substring(0, 1).toUpperCase()}
      </div>
      <div className="flex items-center gap-2">
        {data.urlAvatar ? (
          <Image
            src={data.urlAvatar}
            width={48}
            height={48}
            alt="Avatar"
            className="rounded-full"
          />
        ) : (
          <UserCircle size={48} />
        )}

        <div>
          <h2 className="font-bold text-base">{data.name}</h2>
          <span className="text-[#8C8CBA] text-sm">{`(${data.number.substring(
            0,
            2
          )}) ${data.number.substring(2, 9)}-${data.number.substring(
            9
          )}`}</span>
        </div>
      </div>

      {contactDelete.isActive && (
        <input
          type="checkbox"
          checked={contactDelete.idsContactDelete.some(
            (item) => item === data.name
          )}
          onChange={(event) =>
            dispatch(
              selectContactDelete({
                checked: event.target.checked,
                id: data.name,
              })
            )
          }
          className="absolute right-6 w-5 h-w-5 cursor-pointer"
        />
      )}
    </div>
  );
}
