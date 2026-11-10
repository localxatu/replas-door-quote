# PROJECT_STATUS — REPLAS DOOR

## Trạng thái hiện tại sau khi người dùng upload v1.0 — 2026-11-10

Mốc mã nguồn đã kiểm tra: 4b0e1ba5b98bf5c654cd2067544fee0d18819ef8 (main).
Website: https://localxatu.github.io/replas-door-quote/

**Đã có ứng dụng và dữ liệu trên GitHub; báo cáo khởi tạo bên dưới chỉ còn là
lịch sử. Không dùng kết luận “chưa có mã nguồn” bên dưới làm trạng thái hiện tại.**

### Những gì đã xác nhận

- Người dùng đã thêm ứng dụng trong commit 3ae66c4 và bổ sung PDF/icon trong
  1ef735e, 4b0e1ba. Giữ nguyên ứng dụng hiện tại để phát triển tiếp.
- Có index.html, style.css, app.js, core.js, data.js, catalogue.js, images.js,
  manifest.webmanifest, sw.js, icon, build.py, hướng dẫn và bộ test tính giá.
- Có 5 PDF: docs/abs.pdf, docs/composite.pdf, docs/carbon.pdf,
  docs/installation.pdf, docs/locks.pdf. Không còn cần yêu cầu gửi lại 5 file này.
- Giao diện có ABS/Composite/Carbon, 16 mã màu, danh mục 136 dòng khóa,
  cấu hình kích thước, phụ kiện, công lắp, vận chuyển và lập báo giá.
- Mã có lưu localStorage, sao lưu/nhập JSON, xuất CSV và in/PDF.
  Chưa chạy thử đầy đủ các chức năng xuất/nhập/in trong đợt kiểm tra nhanh này.

### Kiểm tra thực tế ở bản đang public

- Playwright/Chromium: trang trả HTTP 200, tiêu đề “REPLAS · Báo giá cửa”.
- Không có lỗi JavaScript pageerror trong lượt mở trang, thêm cấu hình và reload.
- Đã bấm “Thêm vào báo giá”: đơn hiển thị 1 cấu hình Composite 900×2200 mm,
  tạm tính 4.140.000–4.190.000 đ theo dữ liệu mặc định của ứng dụng.
- Đã chờ “Sẵn sàng offline”, ngắt mạng bằng Playwright rồi reload:
  trang vẫn trả 200 và hiển thị giao diện cấu hình. Đây là thử nghiệm nhanh
  trên Chromium, chưa thay thế kiểm thử toàn bộ quy trình offline trên điện thoại.
- node tests/calculation.test.cjs: 49/49 kiểm tra đạt.
- node --check app.js và core.js: đạt.
- Test đạt xác nhận hành vi theo dữ liệu/test hiện tại; chưa xác nhận đã
  đối chiếu độc lập toàn bộ giá và ảnh với mọi trang PDF/catalogue gốc.

### Điểm còn cần đối chiếu, theo HUONG_DAN.txt hiện có

- 6 ảnh Carbon / CAB 01–06 chưa có bảng quy đổi sang CB11/22/55/66/88/99.
- Ảnh Ô kính 01–06 chưa có bảng đối chiếu đơn giá 201–206.
- ABS 101 và 01 chưa có ảnh với nhãn đúng mã được xác nhận.
- Giá bộ cửa 4 cánh; cách cộng giá sơn Composite; công cửa đôi/xếp;
  VAT công lắp và phụ kiện/bản lề ABS/Carbon còn cần xác nhận theo trường hợp.
- Repo có ảnh đóng gói trong images.js, nhưng chưa có các bản PDF catalogue
  CATALOGUE REPLAS DOOR-v1.2.pdf, RPD_CPS01.pdf dưới dạng file riêng.
  Chỉ yêu cầu cung cấp thêm khi cần đối chiếu nguồn hoặc các điểm chưa rõ.
- Chưa thấy file bảng cước vận chuyển riêng; app có vùng miễn phí và cước nhập
  tay đã xác nhận. Cần đối chiếu nguồn nếu muốn tự tính cước ngoài vùng.

### Bước tiếp theo

Tiếp nối v1.0 hiện có. Khi có yêu cầu phát triển, kiểm tra nhánh và thay đổi mới,
đối chiếu dữ liệu nguồn cần thiết, rồi sửa đúng phạm vi; commit/push theo mốc và
cập nhật báo cáo. Đợt này chỉ cập nhật tài liệu trạng thái, không sửa mã ứng dụng.

## Lịch sử: báo cáo trước khi mã ứng dụng được upload

Cập nhật: 2026-11-10 (UTC).
Repository: https://github.com/localxatu/replas-door-quote
Giai đoạn: kiểm tra và khôi phục đầu vào; chưa lập trình ứng dụng.

## Kết luận kiểm tra

Repository hiện chỉ có phần khởi tạo. Không tìm thấy mã ứng dụng hoặc tài liệu gốc
trong nhánh hiện có và toàn bộ 3 commit truy cập được trước báo cáo này.
Chưa thể đánh giá chất lượng mã, tái sử dụng kiến trúc, hoặc xác nhận chức năng
báo giá đã hoàn thành. Không kết luận rằng mã nguồn/tài liệu trong phiên Work
trước đã mất: phiên này chưa được cung cấp các file đó.

Không xóa, thay thế hay ghi đè 3 file hiện có. Thay đổi của đợt này chỉ là thêm
PROJECT_STATUS.md. Chưa viết lại ứng dụng, chưa tạo dữ liệu mẫu hay tự điền giá/mã.

## Phạm vi và bằng chứng

- Nhánh mặc định và nhánh duy nhất được GitHub trả về: main.
- Bản clone đầy đủ xác nhận chỉ có main và origin/main; không có tag.
- Không có pull request (mọi trạng thái) hoặc release được GitHub trả về.
- Cây Git đệ quy trả về truncated=false; đã đối chiếu bằng git ls-tree.
- Đã xem danh sách file của từng commit và toàn bộ object truy cập được.
- git fsck --full hoàn tất thành công, không báo lỗi.
- Không có AGENTS.md trong repo hoặc các thư mục cha được kiểm tra.
- Thư mục library-files, shared và scratch trong workspace hiện không có file đầu vào.
- Giới hạn: không truy cập được tài liệu hoặc tệp đính kèm của phiên Work trước
  nếu chúng chưa được chuyển sang phiên này hoặc lưu trong repository.
- Phạm vi lịch sử là các ref/object đang được repository công bố và clone được;
  không khẳng định về nhánh đã xóa hoặc nội dung chưa từng được push.

### Commit trước báo cáo (UTC)

| Commit | Thời điểm | Nội dung thực tế |
| --- | --- | --- |
| a466997946b16a6acd06865e2699eddca5cea19e | 2026-11-10 08:50:14 | Prepare original price-list documents folder — thêm docs/.gitkeep rỗng |
| bc67a16de55617a257cbf30d0f13312c5e90e7a0 | 2026-11-10 08:49:08 | Serve the REPLAS app as a static GitHub Pages site — chỉ thêm .nojekyll rỗng |
| 703ff1f3f723c935db7a33eafd7684a86b208bc8 | 2026-11-10 08:48:27 | Initial commit — chỉ thêm README.md |

Tên commit về ứng dụng/GitHub Pages không đồng nghĩa mã ứng dụng đã được upload.

## File xác nhận đã có trên GitHub trước báo cáo

| Đường dẫn | Kích thước | Vai trò |
| --- | ---: | --- |
| README.md | 108 byte | Hai dòng mô tả dự án bằng tiếng Anh |
| .nojekyll | 0 byte | Tệp cấu hình phục vụ tĩnh cho GitHub Pages |
| docs/.gitkeep | 0 byte | Giữ thư mục docs; không phải tài liệu bảng giá |

Không có PDF, ảnh, catalogue, HTML, CSS, JavaScript, TypeScript, JSON dữ liệu,
package.json, lockfile, service worker, manifest ứng dụng hay mã backend.
Không thể xác định tên file gốc còn thiếu khi chưa có danh sách từ phiên trước.

## Khả năng chạy và kiểm thử

- GitHub báo has_pages=true.
- Workflow "pages build and deployment", run 42787589936, commit a466997,
  hoàn tất success lúc 2026-11-10 09:04:36 UTC.
  https://github.com/localxatu/replas-door-quote/actions/runs/42787589936
- HTTP GET có theo redirect tới https://localxatu.github.io/replas-door-quote/
  trả HTTP 404 tại thời điểm kiểm tra.
- Chưa xác định nguyên nhân cấu hình hosting; build success không xác nhận có app.
- Không có index.html hoặc entry point nào khác để chạy web báo giá.
- Không có cấu hình build/test hoặc mã nguồn để kiểm tra lỗi code.
- Đã thử mở bằng Playwright/Chromium; Chromium bị sandbox chặn setsockopt,
  đóng trước khi tải trang. Kết quả 404 nêu trên được kiểm chứng qua HTTP,
  không phải kết quả kiểm thử giao diện.
- Chưa kiểm thử tính giá, lựa chọn sản phẩm, lưu báo giá hay hoạt động offline
  vì không có ứng dụng. Không ghi nhận các chức năng đó là đã hoàn thành.

## Phần hoàn thành được xác nhận

- Tạo repository và nhánh main.
- Thêm mô tả dự án và thư mục docs dưới dạng placeholder.
- Có .nojekyll và một lần workflow GitHub Pages chạy thành công.
- Hoàn tất kiểm kê mã/tài liệu và ghi nhận trạng thái phục vụ phiên tiếp theo.

## Yêu cầu phải giữ nguyên khi tiếp tục

| Hạng mục | Yêu cầu người dùng | Trạng thái trong repository |
| --- | --- | --- |
| Offline | Ưu tiên hoạt động offline | Chưa có mã để xác nhận |
| ABS / Composite | Chung kiểu dáng và mẫu màu; bảng giá riêng | Thiếu mã và dữ liệu |
| Carbon | 6 mẫu, 6 màu riêng; một số kiểu dáng chung ABS/Composite | Thiếu danh mục và quy tắc áp dụng |
| Bảng màu | 16 màu; giữ nguyên ký hiệu gốc | Thiếu ảnh và ký hiệu gốc |
| Khóa | Có ảnh, mã sản phẩm, giá | Thiếu toàn bộ danh mục |
| Lắp đặt | Tính theo từng loại cửa | Thiếu bảng giá/quy tắc |
| Vận chuyển | Tính theo bảng giá | Thiếu bảng giá/quy tắc |
| Báo giá | Chọn sản phẩm và tạo báo giá | Chưa có mã để xác nhận |

Chưa rõ bảng 16 màu có bao gồm 6 màu Carbon hay là bảng riêng;
phải đối chiếu tài liệu gốc, không tự giả định quan hệ.

## Cần người dùng cung cấp lại

Ưu tiên khôi phục mã trước khi chọn kiến trúc hoặc viết ứng dụng mới.

1. Bản mã nguồn gần nhất từ phiên Work cũ: ZIP/thư mục dự án hoặc nhánh/repository
   thực sự chứa mã. Giữ cả assets, file dữ liệu, README và hướng dẫn chạy nếu có.
2. PDF/bảng giá ABS, Composite và Carbon, cùng điều kiện tính giá đi kèm:
   kích thước tiêu chuẩn, đơn vị tính, phụ thu, thuế, hiệu lực bảng giá nếu có.
   Các điều kiện này cần được lấy từ tài liệu, không mặc định đang áp dụng.
3. Catalogue/ảnh kiểu dáng dùng chung ABS và Composite; danh sách kiểu dáng
   Carbon được phép dùng chung; 6 mẫu và 6 màu Carbon riêng có mã gốc.
4. Bảng/ảnh 16 màu đủ độ rõ để đọc chính xác từng ký hiệu và phạm vi áp dụng.
5. Catalogue khóa: ảnh, mã sản phẩm, giá và quy tắc tương thích nếu có.
6. Bảng phí lắp đặt theo loại cửa và điều kiện áp dụng.
7. Bảng phí vận chuyển và căn cứ tính: khu vực/khoảng cách/số lượng hoặc quy tắc
   khác đúng theo tài liệu gốc.
8. Nếu có: danh sách file đã gửi trong phiên trước, bản bàn giao, mẫu báo giá
   hoặc ảnh giao diện cũ để đối chiếu mức hoàn thiện. Ảnh giao diện không thay
   thế được mã nguồn hoặc bảng giá.

Chưa biết tên cụ thể của các file gốc; danh sách trên phân theo nội dung cần có.
Không tự suy đoán giá, mã sản phẩm, mã màu, phí, thuế hoặc quy tắc tính.
Dữ liệu chưa xác minh phải được đánh dấu thiếu; không thay bằng 0 hay giá mẫu.

## Kế hoạch tiếp tục

1. Nhận và kiểm kê file khôi phục: tên, kích thước, checksum, nguồn, tình trạng
   đọc được; đối chiếu tài liệu với danh sách phiên cũ nếu được cung cấp.
2. Kiểm tra mã khôi phục trong nhánh riêng; đọc hướng dẫn dự án, xác định
   entry point, phụ thuộc, dữ liệu và lệnh chạy. Ưu tiên sửa/tiếp nối mã dùng được.
3. Lập bảng dữ liệu có truy vết tài liệu/trang nguồn; giữ nguyên mã màu/sản phẩm.
   Dùng chung danh mục kiểu dáng/màu đúng phạm vi và tách bảng giá ABS/Composite;
   ghi rõ quy tắc Carbon từ nguồn.
4. Hoàn thiện lựa chọn cửa, màu, khóa, phí lắp đặt/vận chuyển và tạo báo giá
   dựa trên kiến trúc hiện có sau khi đã kiểm tra. Chặn báo giá hoàn chỉnh
   nếu dữ liệu bắt buộc chưa được xác minh.
5. Hoàn thiện cách chạy offline phù hợp mã nguồn thực tế; kiểm tra lưu dữ liệu,
   tải lại khi mất mạng và các tài nguyên ảnh/font cần thiết.
6. Kiểm thử các phép tính bằng ví dụ đối chiếu bảng giá gốc, thử quy trình tạo
   báo giá và offline trên trình duyệt.
7. Commit theo từng mốc có thể kiểm tra, push GitHub và cập nhật file trạng thái
   trong cùng mốc. Ghi rõ kiểm thử đã chạy, phần còn thiếu và bước tiếp theo.

## Quy tắc bàn giao cho phiên Codex sau

- Trước mọi sửa đổi: git status, kiểm tra nhánh, đọc PROJECT_STATUS.md và
  AGENTS.md nếu được thêm sau này; bảo toàn thay đổi chưa commit của người dùng.
- Đọc lịch sử mới và so với mốc kiểm tra a466997; báo cáo này là ảnh chụp
  trạng thái tại thời điểm audit, không thay thế việc đọc repo hiện tại.
- Không xóa/ghi đè dữ liệu chưa kiểm tra; không viết lại từ đầu nếu mã khôi phục
  còn sử dụng được.
- Không đánh dấu chức năng hoàn thành chỉ dựa trên tên commit hoặc build xanh.
- Không tuyên bố đã push nếu chưa xác nhận commit tồn tại trên GitHub.
- Nhiệm vụ ngay tiếp theo: khôi phục mã nguồn phiên Work trước và tài liệu gốc;
  chưa bắt đầu lập trình ứng dụng trong đợt kiểm tra này.
