const pad = (n) => String(n).padStart(2, "0");
export const vnd = (n) => `${n.toLocaleString("vi-VN")}đ`;
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const dmy = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
export const WEEKDAYS_LONG = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
export const weekday = (d) => WEEKDAYS_LONG[d.getDay()];

export function addMinutes(time, minutes) {
  const [h, m] = time.split(":").map(Number);
  const t = h * 60 + m + minutes;
  return `${pad(Math.floor(t / 60) % 24)}:${pad(t % 60)}`;
}

export const stripAccents = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");

export function downloadIcs({ title, date, start, end, location, description }) {
  const stamp = (t) => `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${t.replace(":", "")}00`;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Q.Archives//VI", "BEGIN:VEVENT",
    `UID:${stamp(start)}@q-archives`,
    `DTSTART;TZID=Asia/Ho_Chi_Minh:${stamp(start)}`,
    `DTEND;TZID=Asia/Ho_Chi_Minh:${stamp(end)}`,
    `SUMMARY:${title}`, `LOCATION:${location}`, `DESCRIPTION:${description}`,
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "q-archives-buoi-chup.ics";
  a.click();
  URL.revokeObjectURL(a.href);
}
