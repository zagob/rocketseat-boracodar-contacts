import { FormEvent, RefObject } from "react";

interface FormModalProps {
  onHandleSubmit: (event: FormEvent) => void;
  nameRef: RefObject<HTMLInputElement>;
  urlAvatarRef: RefObject<HTMLInputElement>;
  dddRef: RefObject<HTMLInputElement>;
  telRef: RefObject<HTMLInputElement>;
  nameValueDefault?: string;
  urlAvatarValueDefault?: string;
  dddValueDefault?: string;
  telValueDefault?: string;
}

export function FormModal({
  onHandleSubmit,
  nameRef,
  urlAvatarRef,
  dddRef,
  telRef,
  nameValueDefault,
  urlAvatarValueDefault,
  dddValueDefault,
  telValueDefault,
}: FormModalProps) {
  return (
    <form onSubmit={onHandleSubmit} className="w-[400px] space-y-6">
      <div className="space-y-3">
        <div className="grid gap-1">
          <label htmlFor="name" className="text-white">
            Nome:
          </label>
          <input
            id="name"
            type="text"
            defaultValue={nameValueDefault}
            ref={nameRef}
            placeholder="Nome"
            className="outline-none border-none bg-[#24243D] text-zinc-50 px-2 rounded h-8 placeholder:text-zinc-300/20"
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor="avatar" className="text-white">
            URL Avatar:
          </label>
          <input
            id="avatar"
            type="text"
            defaultValue={urlAvatarValueDefault}
            ref={urlAvatarRef}
            placeholder="https://www.avatarexample.com"
            className="outline-none border-none bg-[#24243D] text-zinc-50 px-2 rounded h-8 placeholder:text-zinc-300/20"
          />
        </div>
        <div className="grid grid-cols-8 gap-2">
          <div className="grid gap-1 col-span-2">
            <label htmlFor="ddd" className="text-white">
              DDD:
            </label>
            <input
              id="ddd"
              type="text"
              defaultValue={dddValueDefault}
              minLength={2}
              maxLength={2}
              placeholder="DDD"
              ref={dddRef}
              className="outline-none w-full border-none bg-[#24243D] text-zinc-50 px-2 rounded h-8 placeholder:text-zinc-300/20"
            />
          </div>
          <div className="grid gap-1 col-span-6">
            <label htmlFor="tel" className="text-white">
              Telefone:
            </label>
            <input
              id="tel"
              type="text"
              defaultValue={telValueDefault}
              minLength={11}
              maxLength={11}
              placeholder="99999-9999"
              ref={telRef}
              className="outline-none w-full border-none bg-[#24243D] text-zinc-50 px-2 rounded h-8 placeholder:text-zinc-300/20"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="border-2 w-full border-[#24243D] text-zinc-100 px-3 h-8 bg-[#24243D]/50 rounded hover:brightness-110 transition-all"
      >
        Adicionar contado
      </button>
    </form>
  );
}
