# Thêm ảnh vào web

Web tự đọc ảnh trong thư mục này. Mỗi **bộ ảnh** là một thư mục con nằm trong thư mục **concept**:

```
src/photos/
├── sinh-nhat/
│   └── tuoi-22-cua-linh/        ← tên thư mục = đường dẫn của bộ ảnh (viết không dấu, nối bằng -)
│       ├── 01.jpg               ← ảnh xếp theo tên file: 01, 02, 03…
│       ├── 02.jpg
│       └── info.json            ← (không bắt buộc) tên, mô tả bộ ảnh
├── nang-tho/
├── beauty/
├── co-trang/
└── sexy/
```

Concept hợp lệ: `sinh-nhat`, `nang-tho`, `beauty`, `co-trang`, `sexy`
(muốn thêm concept mới → thêm vào `CONCEPTS` trong `src/data/studio.js` rồi tạo thư mục cùng tên).

## info.json (tuỳ chọn)

```json
{
  "title": "Tuổi 22 của Linh",
  "meta": "Bánh kem & bóng bay · Studio",
  "story": "Một buổi chiều nhỏ xinh mừng tuổi mới…",
  "date": "2025-02",
  "cover": "03.jpg",
  "pkg": "ke"
}
```

- `date` (YYYY-MM): dùng để sắp xếp "Mới nhất".
- `cover`: ảnh bìa; bỏ trống thì lấy ảnh đầu tiên.
- `pkg`: gói đã chụp (`cham`, `ke`, `luu`), có thể bỏ.

Thiếu `info.json` thì tên bộ ảnh lấy từ tên thư mục.

## Lưu ý

- Nên xuất ảnh cạnh dài khoảng **2000px**, JPG chất lượng ~80% (mỗi ảnh < 1MB) để web tải nhanh.
- Khi chưa có ảnh nào trong thư mục này, web sẽ hiện ảnh mẫu.
- Concept **Sexy**: chỉ đưa lên những ảnh khách đã đồng ý công khai.
