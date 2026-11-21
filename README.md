# REPLAS Door Quote

Ứng dụng tĩnh bằng HTML/CSS/JavaScript, dùng bảng giá và ảnh người dùng cung cấp. Không cần thư viện ngoài hoặc máy chủ tính toán. Hỗ trợ GitHub Pages và đường dẫn thư mục con.

## Tệp phát hành

- `index.html`, `style.css`, `app.js`: giao diện.
- `core.js`: công cụ tính độc lập, lưu nguồn và ghi chú khoản chưa rõ.
- `data.js`: bảng giá 3 dòng cửa, 136 dòng khóa, 16 mã màu và điều kiện.
- `catalogue.js`: nhãn, nguồn, trang và độ chắc chắn của 76 ảnh mẫu.
- `images.js`: toàn bộ ảnh tối ưu được đóng gói; không cần upload từng ảnh.
- `sw.js`, `manifest.webmanifest`, `icon*`: cài lên màn hình chính và dữ liệu offline.
- `docs/*.pdf`: bản gốc các bảng báo giá.

Xem `HUONG_DAN.txt` để cài và sử dụng. Gói ZIP đặt `index.html` ở thư mục gốc, sẵn sàng tải lên GitHub Pages.

## Tính giá

Giá cửa gồm VAT; giá khóa chưa VAT 10%; công lắp đặt chưa VAT và chưa có thuế suất nguồn. Giữ khoảng giá khi nguồn là khoảng. Phí vận chuyển ở cấp đơn. Các vật tư trong gói không tự cộng lần hai. Không suy đoán đơn giá vượt giới hạn hoặc các phép đổi mã chưa được xác nhận.

Số lượng vật tư tính theo bộ/cánh rồi nhân số lượng cấu hình. Ô fix dùng chu vi và điều kiện “dưới” của bảng nguồn. Khóa trùng mã được giữ thành các dòng theo STT để không mất giá/vật liệu khác nhau.

## Lưu trữ

`localStorage` lưu báo giá trên thiết bị. JSON giúp sao lưu/di chuyển. Không có tài khoản và không tự đồng bộ nhiều thiết bị. Service worker chỉ báo sẵn sàng khi cache đủ danh sách phát hành; một bản cache mới chỉ kích hoạt sau khi tải thành công toàn bộ.

## In / lưu PDF

Bản in theo mẫu BẢNG BÁO GIÁ A4 (Times New Roman): tiêu đề công ty + logo, Số báo giá dạng D+MMDD-YY/RP, bảng STT / TÊN HÀNG / Hình ảnh / CRK-CCK-ĐDK / ĐVT / SL / ĐƠN GIÁ / THÀNH TIỀN / GHI CHÚ, dòng CỘNG, ghi chú + điều khoản thanh toán (tài khoản 8981188888, Ngân hàng TMCP Quân Đội - Chi Nhánh Bắc Sài Gòn) và khối liên hệ nhân viên kinh doanh. Tên, số điện thoại nhân viên và quà tặng kèm nhập ở mục Báo giá công trình; để trống thì khối liên hệ và dòng Tặng không hiện. Cột ĐDK trong file mẫu ghi “LR” (chưa rõ là hướng mở hay thông số khác) — web chưa có ô nhập tương ứng nên đang để “—”. Khoản chưa tính được giá hiện “Cần xác nhận” thay vì cộng dồn số thiếu.

## Kiểm tra

Trong bộ nguồn tác nghiệp, chạy `node tests/calculation.test.cjs`. Bộ kiểm tra đối chiếu các mức giá, bậc kích thước, VAT, phụ thu, ô fix, số lượng và phí vận chuyển theo bảng nguồn. Giao diện được kiểm tra trên trình duyệt bằng bản preview.
