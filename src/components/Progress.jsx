// Thanh tiến trình 2 bước: done=true → bước 1 đã xong (trang xác nhận)
export default function Progress({ done = false }) {
  return (
    <p className="progress" aria-label="Tiến trình đặt lịch">
      <span>{done ? "✓" : "01"}  Chọn & đặt lịch</span>
      <span className="progress__bar" />
      <span>02  Xác nhận</span>
    </p>
  );
}
