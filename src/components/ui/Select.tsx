export type SelectOption<T = string> = {
  label: string;
  value: T;
};

type SelectProps<T> = {
  value?: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Select<T extends string | number>({
  value,
  options,
  onChange,
  placeholder = "Select option",
  disabled,
}: SelectProps<T>) {
  return (
    <select
      disabled={disabled}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value as T)}
    >
      <option value="" disabled>
        {placeholder}
      </option>

      {options.map((opt) => (
        <option key={String(opt.value)} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
