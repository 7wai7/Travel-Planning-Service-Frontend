export type FieldErrorItem = {
  field: string;
  message: string;
};

export class FieldError extends Error {
  fields: FieldErrorItem[];

  constructor(fields: FieldErrorItem[]) {
    super("Validation error");
    this.fields = fields;
  }
}
