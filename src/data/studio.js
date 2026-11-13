// ⚠️ THAY số điện thoại / Zalo bên dưới bằng số thật của bạn (zalo = số viết liền, không khoảng trắng)
const ZALO = "0901234567";

export const STUDIO = {
  name: "Q.Archives",
  tagline: "Hãy để mình chụp lại những hình ảnh đẹp nhất của bạn.",
  city: "TP. Hồ Chí Minh",
  phone: ZALO.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4"),
  phoneHref: `tel:${ZALO}`,
  address: "TP. Hồ Chí Minh — studio hoặc ngoại cảnh tuỳ concept",
  addressShort: "TP.HCM · địa điểm báo khi xác nhận lịch",
  mapsHref: "https://www.google.com/maps/search/?api=1&query=TP.+H%E1%BB%93+Ch%C3%AD+Minh",
  depositRate: 0.3,
};

// Kênh liên hệ — hiển thị ở phần Liên hệ, footer và nút nổi góc màn hình
export const CONTACTS = [
  { id: "zalo", label: "Zalo", handle: STUDIO.phone, href: `https://zalo.me/${ZALO}`, cta: "Nhắn Zalo", primary: true },
  { id: "messenger", label: "Messenger", handle: "Q.Archives", href: "https://m.me/fagecuaQuang", cta: "Nhắn Messenger", primary: true },
  { id: "facebook", label: "Facebook", handle: "Q.Archives", href: "https://www.facebook.com/fagecuaQuang", cta: "Xem trang" },
  { id: "instagram", label: "Instagram", handle: "@qar_chive", href: "https://www.instagram.com/qar_chive/", cta: "Xem ảnh mới" },
  { id: "tiktok", label: "TikTok", handle: "@hnq.archives", href: "https://www.tiktok.com/@hnq.archives", cta: "Xem hậu trường" },
];
export const contactOf = (id) => CONTACTS.find((c) => c.id === id);

// Concept chụp — dùng cho bộ lọc bộ sưu tập, trang chủ và trang đặt lịch
export const CONCEPTS = [
  { id: "sinh-nhat", label: "Sinh nhật", desc: "Bánh kem, bóng bay và nụ cười của tuổi mới. Một bộ ảnh để nhớ mình đã lớn thêm thế nào." },
  { id: "nang-tho", label: "Nàng thơ", desc: "Váy nhẹ, hoa cỏ và ánh nắng dịu. Dành cho những tâm hồn mơ mộng, trong trẻo." },
  { id: "beauty", label: "Beauty", desc: "Cận cảnh làn da, ánh mắt và đường nét. Trang điểm chỉn chu, ánh sáng mềm, tôn vẻ đẹp riêng." },
  { id: "co-trang", label: "Cổ trang", desc: "Áo dài, cổ phục và những chi tiết xưa. Nét đẹp Á Đông được kể lại bằng ánh sáng hôm nay." },
  { id: "sexy", label: "Sexy", desc: "Quyến rũ, tự tin mà vẫn tinh tế. Không gian riêng tư, bạn được xem ảnh trực tiếp và luôn được tôn trọng." },
];

export const PACKAGES = [
  {
    id: "cham", name: "Chạm", price: 1200000, minutes: 45, photos: 8,
    desc: "Một buổi hẹn ngắn, chạm đến từng khoản khắc của bạn.",
    perks: ["45 phút chụp · 1 người", "1 concept · 1 trang phục", "10 ảnh chỉnh sửa kỹ · Trả toàn bộ ảnh gốc", "Makeup - tư vấn trang phục & hướng dẫn tạo dáng"],
    summary: ["1 concept · 1 trang phục · 10 ảnh chỉnh sửa", "Tư vấn trang phục & hướng dẫn tạo dáng"],
    note: "Gói Chạm gồm 1 concept, 1 trang phục, tư vấn trang phục & hướng dẫn tạo dáng.",
  },
  {
    id: "ke", name: "Kể", price: 2400000, minutes: 90, photos: 15, badge: "ĐƯỢC YÊU THÍCH",
    desc: "Thêm thời gian để câu chuyện được kể trọn vẹn.",
    perks: ["90 phút chụp · 1–2 người", "2 concept · 2 trang phục", "15 ảnh chỉnh sửa kỹ · Trả toàn bộ ảnh gốc", "Trang điểm & làm tóc cho 1 người"],
    summary: ["2 concept · 2 trang phục · 15 ảnh chỉnh sửa", "Trang điểm & làm tóc cho 1 người"],
    note: "Gói Kể gồm 2 concept, 2 trang phục, trang điểm & làm tóc cho 1 người.",
  },
  {
    id: "luu", name: "Lưu", price: 3600000, minutes: 120, photos: 25,
    desc: "Dành cho những kỷ niệm muốn giữ thật lâu.",
    perks: ["120 phút chụp · Tối đa 4 người", "2 concept · 3 trang phục", "25 ảnh chỉnh sửa kỹ · Toàn bộ ảnh gốc", "Trang điểm 1 người · 1 ảnh in 20 × 30"],
    summary: ["2 concept · 3 trang phục · 25 ảnh chỉnh sửa", "Trang điểm 1 người · 1 ảnh in 20 × 30"],
    note: "Gói Lưu gồm 2 concept, 3 trang phục, trang điểm 1 người, 1 ảnh in 20 × 30.",
  },
];

const IMG = { a1: "/assets/album-1.png", a2: "/assets/album-2.png", a3: "/assets/album-3.png", hero: "/assets/hero-portrait.png", concept: "/assets/concept-portrait.png" };

// Bộ ảnh MẪU — chỉ hiển thị khi thư mục src/photos chưa có ảnh nào.
// Ảnh thật được đọc tự động trong src/data/photos.js (xem src/photos/HUONG-DAN.md).
export const SAMPLE_ALBUMS = [
  { id: "tuoi-hai-muoi-hai", concept: "sinh-nhat", title: "Tuổi hai mươi hai", meta: "Bánh kem & bóng bay", count: 18, pkg: "ke", date: "2026-10", img: IMG.a1,
    story: "Một chiếc bánh nhỏ, vài quả bóng màu kem và người bạn thân đứng cạnh. Tuổi mới bắt đầu bằng những tiếng cười thật to.",
    gallery: [IMG.a1, IMG.hero, IMG.concept] },
  { id: "thoi-nen-cung-nhau", concept: "sinh-nhat", title: "Thổi nến cùng nhau", meta: "Sinh nhật cho hai người", count: 20, pkg: "ke", date: "2026-08", img: IMG.a2,
    story: "Không cần tiệc lớn. Chỉ hai người, một ngọn nến và lời ước nói khẽ.",
    gallery: [IMG.a2, IMG.a3, IMG.a1] },
  { id: "tron-mot-tuoi", concept: "sinh-nhat", title: "Tròn một tuổi", meta: "Sinh nhật bé cùng gia đình", count: 26, pkg: "luu", date: "2026-06", img: IMG.a3,
    story: "Bé bốc bánh kem bằng tay, bố mẹ cười không ngớt. Một năm đầu đời được giữ lại trọn vẹn.",
    gallery: [IMG.a3, IMG.a2, IMG.hero] },
  { id: "mot-chut-an-yen", concept: "nang-tho", title: "Một chút an yên", meta: "Ánh sáng tự nhiên", count: 18, pkg: "ke", date: "2026-09", img: IMG.hero,
    story: "Một buổi sáng chậm bên khung cửa lớn, nơi ánh sáng đi qua rèm và mọi thứ đều dịu lại.",
    gallery: [IMG.hero, IMG.concept, IMG.a1] },
  { id: "hoa-co-may-ngan", concept: "nang-tho", title: "Hoa cỏ mây ngàn", meta: "Váy trắng & hoa khô", count: 16, pkg: "cham", date: "2026-07", img: IMG.concept,
    story: "Váy trắng, bó hoa khô và một chút gió. Bộ ảnh cho những ngày muốn mình thật nhẹ.",
    gallery: [IMG.concept, IMG.hero, IMG.a1] },
  { id: "net-moc", concept: "beauty", title: "Nét mộc", meta: "Trang điểm trong veo", count: 12, pkg: "cham", date: "2026-10", img: IMG.concept,
    story: "Lớp nền mỏng, đôi má hồng nhẹ. Cận cảnh để thấy vẻ đẹp vốn có của bạn.",
    gallery: [IMG.concept, IMG.a1, IMG.hero] },
  { id: "anh-mat", concept: "beauty", title: "Ánh mắt", meta: "Cận cảnh, ánh sáng mềm", count: 14, pkg: "ke", date: "2026-05", img: IMG.a1,
    story: "Mọi thứ bắt đầu từ ánh mắt. Bộ ảnh beauty tập trung vào đường nét và biểu cảm.",
    gallery: [IMG.a1, IMG.concept, IMG.hero] },
  { id: "ao-dai-chieu-thu", concept: "co-trang", title: "Áo dài chiều thu", meta: "Áo dài lụa · Quạt giấy", count: 20, pkg: "ke", date: "2026-09", img: IMG.a2,
    story: "Tà áo lụa, chiếc quạt giấy và nắng chiều xiên qua song cửa gỗ.",
    gallery: [IMG.a2, IMG.hero, IMG.a3] },
  { id: "nhat-binh", concept: "co-trang", title: "Nhật Bình", meta: "Cổ phục cung đình", count: 24, pkg: "luu", date: "2026-04", img: IMG.a3,
    story: "Áo Nhật Bình, khăn vấn và trang sức cổ. Một lần được làm người con gái của thời xưa.",
    gallery: [IMG.a3, IMG.a2, IMG.concept] },
  { id: "lua-den", concept: "sexy", title: "Lụa đen", meta: "Low-key · Tối giản", count: 15, pkg: "ke", date: "2026-10", img: IMG.hero,
    story: "Nền tối, một dải sáng và chất lụa mềm. Quyến rũ nằm ở sự tự tin, không ở sự phô bày.",
    gallery: [IMG.hero, IMG.concept, IMG.a2] },
  { id: "phien-ban-tu-tin", concept: "sexy", title: "Phiên bản tự tin", meta: "Ê-kíp nữ · Không gian riêng", count: 18, pkg: "luu", date: "2026-03", img: IMG.a1,
    story: "Bộ ảnh dành tặng chính mình, chụp trong không gian kín với ê-kíp toàn nữ.",
    gallery: [IMG.a1, IMG.hero, IMG.concept] },
];

export const STEPS = [
  { n: "01", title: "Chọn điều bạn thích", text: "Xem bộ sưu tập, chọn concept và gói chụp. Còn phân vân thì nhắn mình qua Zalo nhé." },
  { n: "02", title: "Hẹn một ngày đẹp", text: "Chọn ngày, giờ còn trống và để lại thông tin. Mọi thứ chỉ trong một trang đặt lịch." },
  { n: "03", title: "Đến và là chính bạn", text: "Mình lo ánh sáng, góc máy và hướng dẫn tạo dáng. Bạn chỉ cần mang theo tâm trạng thật vui." },
];

// FAQ theo chủ đề — trang Giới thiệu hiển thị toàn bộ, trang chủ dùng FAQ (3 câu nổi bật)
export const FAQ_GROUPS = [
  { id: "buoi-chup", label: "Buổi chụp", items: [
    { q: "Mình chưa biết tạo dáng, có chụp được không?", a: "Được chứ. Nhiếp ảnh gia sẽ hướng dẫn từng chút một, từ ánh mắt đến chuyển động, để bạn luôn tự nhiên trước ống kính." },
    { q: "Mình cần chuẩn bị trang phục như thế nào?", a: "Bạn không cần lo trước. Sau khi đặt lịch, mình sẽ liên hệ để tư vấn concept và trang phục phù hợp với bạn." },
    { q: "Mình chưa có trang phục theo concept thì sao?", a: "Mình sẽ gợi ý trang phục, phụ kiện theo concept và chỗ thuê đồ uy tín (áo dài, cổ phục, váy nàng thơ…). Bạn cũng có thể mang đồ riêng." },
    { q: "Mình có thể dẫn bạn bè hoặc người thân đi cùng không?", a: "Hoàn toàn được. Số người tham gia chụp tuỳ theo gói, người đi cùng để hỗ trợ thì không tính thêm phí." },
  ] },
  { id: "dat-lich", label: "Đặt lịch & thanh toán", items: [
    { q: "Nếu bận, mình có thể đổi lịch không?", a: "Được. Mình cho đổi lịch miễn phí 1 lần khi bạn báo trước ít nhất 48 giờ." },
    { q: "Đặt cọc bao nhiêu và thanh toán thế nào?", a: "Bạn đặt cọc 30% giá gói để giữ lịch, qua chuyển khoản. Phần còn lại thanh toán sau buổi chụp bằng tiền mặt hoặc chuyển khoản." },
    { q: "Huỷ lịch có được hoàn cọc không?", a: "Huỷ trước 72 giờ được hoàn 100% tiền cọc. Sau thời gian này, tiền cọc được chuyển thành lịch chụp khác trong vòng 30 ngày." },
    { q: "Giá gói đã gồm những gì?", a: "Giá trọn gói đã gồm không gian studio, nhiếp ảnh gia, chỉnh sửa ảnh và thuế. Không phụ phí ẩn." },
  ] },
  { id: "anh", label: "Ảnh & bàn giao", items: [
    { q: "Bao lâu thì mình nhận được ảnh?", a: "Ảnh gốc được gửi ngay trong ngày. Ảnh chỉnh sửa kỹ được gửi trong 2–3 ngày làm việc qua Google Drive." },
    { q: "Mình có được chọn ảnh để chỉnh sửa không?", a: "Có. Bạn tự chọn ảnh yêu thích từ bộ ảnh gốc, mình chỉnh sửa đúng số lượng trong gói. Muốn chỉnh thêm thì nhắn mình báo giá nhé." },
    { q: "Ảnh của mình có bị đăng lên mạng không?", a: "Không, nếu bạn chưa đồng ý. Mình luôn hỏi trước khi dùng ảnh cho bộ sưu tập. Riêng concept Sexy, ảnh không bao giờ được công khai nếu không có sự cho phép bằng văn bản." },
  ] },
  { id: "concept", label: "Concept", items: [
    { q: "Mình nên chọn concept nào?", a: "Hãy xem bộ sưu tập và chọn bộ ảnh bạn thấy giống mình nhất. Nếu vẫn phân vân, nhắn mình qua Zalo/Messenger để được tư vấn theo dáng người, tính cách và dịp chụp." },
    { q: "Concept Sexy có riêng tư không?", a: "Có. Buổi chụp diễn ra trong không gian kín, không có người ngoài, bạn có thể đi cùng bạn thân. Bạn được xem ảnh trực tiếp và quyết định ảnh nào được giữ lại." },
    { q: "Chụp Cổ trang có cần làm tóc cầu kỳ không?", a: "Mình sẽ tư vấn kiểu tóc hợp concept. Gói Kể và Lưu đã gồm trang điểm & làm tóc; với gói Chạm, bạn có thể thêm dịch vụ làm tóc." },
  ] },
];

export const FAQ = [FAQ_GROUPS[0].items[0], FAQ_GROUPS[0].items[1], FAQ_GROUPS[1].items[0]];

// Dịch vụ thêm (MẪU — điều chỉnh theo bảng giá thật)
export const ADDONS = [
  { name: "Thêm 1 người", price: 300000 },
  { name: "Thêm 1 trang phục", price: 200000 },
  { name: "Trang điểm & làm tóc thêm 1 người", price: 400000 },
  { name: "Chỉnh sửa thêm 1 ảnh", price: 50000 },
  { name: "In ảnh 20 × 30 có khung", price: 250000 },
];

// Lịch trống (demo — thay bằng dữ liệu từ API)
export const AVAILABILITY = {
  minDate: new Date(2026, 10, 12),
  maxDate: new Date(2026, 10, 30),
  fullDays: ["2026-11-14", "2026-11-18", "2026-11-21", "2026-11-28"],
  slots: ["09:00", "10:30", "13:00", "14:30", "16:00"],
  bookedSlots: ["14:30"],
};
