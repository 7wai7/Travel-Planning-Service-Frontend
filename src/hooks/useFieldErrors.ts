import { useState } from "react";

export type Errors = Record<string, { message: string }>;

export default function useFieldErrors() {
  const [errors, setErrors] = useState<Errors>({});

  const showErrors = (errors: { field: string; message: string }[]) => {
    const updated: Errors = {};
    for (const err of errors) {
      updated[err.field] = { message: err.message };
    }
    setErrors(updated);
  };

  return {
    errors,
    setErrors,
    showErrors,
  };
}
