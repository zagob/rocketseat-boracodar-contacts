import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface ModalProps {
  title: string;
  titleButton?: string | ReactNode | JSX.Element;
  showModal: boolean;
  children: ReactNode;
  onCloseModalOff?: () => void;
}

export function Modal({
  children,
  onCloseModalOff,
  showModal,
  titleButton,
  title,
}: ModalProps) {
  return (
    <Dialog.Root open={showModal}>
      <Dialog.Trigger asChild>{titleButton}</Dialog.Trigger>
      <Dialog.Portal className="border bg-red-500 text-white z-10">
        <Dialog.Overlay
          className="fixed inset-0 bg-zinc-600/30"
          onClick={onCloseModalOff}
        />
        <Dialog.Content className="fixed rounded top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#16151E] shadow-md shadow-zinc-900 p-4">
          <Dialog.Title className="text-xl font-bold text-zinc-100 mb-5">
            {title}
          </Dialog.Title>
          {children}
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
