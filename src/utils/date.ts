export const formatDateInput = (date?: string) => {
  return date? new Date(date).toLocaleDateString() : ""
}

export const toDateInputValue = (value?: string | Date | null) => {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}


export const formatTimeInput = (date?: string) =>
  date ? date.slice(11, 16) : "";

export const buildLocalISO = (date: string, time: string) => {
  // YYYY-MM-DD + HH:mm → YYYY-MM-DDTHH:mm:00
  return `${date}T${time}:00`;
};

export const toLocalTimestamp = (date: string) => {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) {
    throw new Error("Invalid date format");
  }
  return d.getTime();
};

export const combineDateAndTimeToTimestamp = (
  date: string, // YYYY-MM-DD
  time: string  // HH:mm
): number => {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);

  return new Date(y, m - 1, d, h, min, 0, 0).getTime();
};