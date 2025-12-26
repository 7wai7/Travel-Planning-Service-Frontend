
import { type ReactNode, useEffect } from "react";
import css from "../../styles/Modal.module.css";

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
      className={css.modal_overlay}
      onMouseDown={() => {
        if (closeOnBackdrop) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={css.modal}
        onMouseDown={(e) => e.stopPropagation()}
        aria-labelledby="modal-title"
      >
        <header className={css.modal_header}>
          {title && <h3 id="modal-title" className={css.modal_title}>{title}</h3>}
        </header>

        <div className={css.modal_body}>{children}</div>

        {footer && <footer className={css.modal_footer}>{footer}</footer>}
      </div>
    </div>
  );
}
