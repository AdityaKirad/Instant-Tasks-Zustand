import dayjs from "dayjs";

interface formatDateProps {
  date?: string | Date | null;
  format: string;
}

export function formatDate({ date, format }: formatDateProps) {
  return dayjs(date).format(format);
}
