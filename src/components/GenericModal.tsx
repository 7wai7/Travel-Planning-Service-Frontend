import { type FormEvent, type ReactNode } from "react";
import css from "../styles/Modal.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { useMutation } from "@tanstack/react-query";

interface GenericModalProps<T, E> {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  mutationFn: (input: T) => Promise<E>;
  onSuccess: (data: E) => void;
  getInput: () => T;
  children: ReactNode; // Поля форми
}

export default function GenericModal<T, E>({
  isOpen,
  setIsOpen,
  mutationFn,
  onSuccess,
  getInput,
  children,
}: GenericModalProps<T, E>) {
  const { mutate, isPending, error } = useMutation({
    mutationFn,
    onSuccess: (data) => {
      onSuccess(data as E);
      setIsOpen(false);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    mutate(getInput());
  };

  if (!isOpen) return null;

  return (
    <section className={css.modal} onClick={() => setIsOpen(false)}>
      <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
        {children}
        {error && <p className={css.error_message}>{error.message}</p>}
        {isPending && (
          <div className={css.pending_panel}>
            <LoadingSpinner size={4} description="none" />
          </div>
        )}
      </form>
    </section>
  );
}
