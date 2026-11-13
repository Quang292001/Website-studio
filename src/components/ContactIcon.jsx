// Biểu tượng đơn giản cho từng kênh liên hệ (vẽ nét, theo màu chữ hiện tại)
const PATHS = {
  zalo: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2 2 0 0 1 4 15z" /><path d="M8 8h4l-4 5h4M14.5 8v5" /></>,
  messenger: <><path d="M12 3c5 0 9 3.6 9 8.2s-4 8.2-9 8.2c-.9 0-1.8-.1-2.6-.3L5 21v-3.6A8 8 0 0 1 3 11.2C3 6.6 7 3 12 3z" /><path d="m7.5 13.5 3-3.2 2.2 2 3.8-2.8-3 3.2-2.2-2z" /></>,
  facebook: <><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M15.5 8H14a2 2 0 0 0-2 2v11M9.5 13h5" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></>,
  tiktok: <><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" /><path d="M14 3c.4 2.6 2 4.3 5 4.6" /></>,
  chat: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4A2 2 0 0 1 4 15z" /><path d="M8.5 10h.01M12 10h.01M15.5 10h.01" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export default function ContactIcon({ name, size = 20 }) {
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
