import { type ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  closeOnBackdrop?: boolean; // default true
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
  footer,
  closeOnBackdrop = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onMouseDown={() => {
        if (closeOnBackdrop) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal w-[60%] min-h-min p-4 flex flex-col relative"
        onMouseDown={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
      >
        {title && <header className="text-black text-2xl">{title}</header>}

        <div className="mt-4 h-full">{children}</div>

        {footer && <footer className="flex justify-end gap-2 mt-4">{footer}</footer>}
      </div>
    </div>
  );
}
