---
title: Các lỗi security đã gặp
author: DungNT
---

## Improper Output Neutralization for Logs (CWE-117)

Là lỗi bảo mật liên quan đến việc không xử lý dữ liệu đầu vào (user input) trước khi ghi vào log, có thể bị chèn các ký tự đặc biệt dẫn đến có thể bị tấn công hoặc lộ thông tin

Cách khắc phục:
+ Không ghi thông tin nhạy cảm vào log
+ Lọc dữ liệu đầu vào (từ người dùng) trước khi lưu vào log
+ Sử dụng các lib đáng tin cậy, bảo mật tốt

## Use of GET Request Method With Sensitive Query Strings (CWE-598)

Xảy ra khi dữ liệu nhạy cảm được truyền qua phương thức GET

Thông tin bị lưu trữ trên lịch sử trình duyệt có nguy cơ bị lộ, người dùng có thể vô tình chia sẻ URL dẫn đến lộ thông tin

Cách khắc phục:
+ Không đưa thông tin nhạy cảm vào GET (pass, token, thông tin cá nhân,...)
+ Chuyển sang sử dụng phương thức POST

## Use of Hard-coded Credentials (CWE-798)

Là một lỗi nghiêm trọng khi trong ứng dụng hard-codeed các credentials như password, các key mã hoá. Trong trường hợp source code bị lộ thì điều này có thể dẫn tới bị kẻ xấu truy cập, sử dụng

Cách khắc phục:
+ Sử dụng biến môi trường
+ Sử dụng các secret vault để quản lý api key, db,...
+ Mã hoá thông tin nhạy cảm

## Unrestricted Upload of File with Dangerous Type (CWE-434)

Xảy ra khi hệ thống cho phép người dùng tải file lên mà không có cơ chế kiểm soát (size file) hoặc giới hạn loại file. Điều này khiến cho kẻ xấu có thể upload lên các file .exe, .sh, .js, .php,..., 

Cần phải kiểm tra tệp kỹ, không được phép chỉ check đuôi file vì có thể đổi các đuôi file độc hại thành các đuôi file hợp lệ

Cách khắc phục:
+ Giới hạn loại file tải lên:
 Chỉ cho phép các file an toàn được tải lên, Lưu ý cần check MIME Type và cả phần extension của file, thậm chí có thể kiểm tra nội dung file
+ Giới hạn lại kích thước file, tránh bị spam upload khiến ảnh hưởng performance

## Observable Response Discrepancy (CW-204)

Đây là lỗi thường xảy ra form login đưa ra thông tin quá cụ thể thành ra xác định được username có tồn tại và có thể sử dụng brute-force hoặc các phương pháp tấn công khác để dò mật khấu

Giả sử khi đăng nhập, nếu người dùng nhập sai username thì trả về thông báo *Tên tài khoản không tồn tại*, Nhưng khi nhập vào một tài khoản hợp lệ nhưng mật khẩu sai thì lại thông báo *Mật khẩu không đúng* dẫn đến kẻ tấn công có thể thử nhiều tài khoản để biết tài khoản nào hợp lệ và triển khai tấn công dò mật khẩu.

Khắc phục:
+ Nên đưa ra một thông báo chung, ví dụ: *Tên tài khoản hoặc mật khẩu không đúng*
+ Trường hợp trả về api thì nên trả về 403 (hoặc status code tự định nghĩa) mang ý nghĩa chung là không tồn tại 
+ Thực hiện rate limiting để tránh bị tấn công brute-force 
+ Có thể sử dụng CAPTCHA
+ Giới hạn số lần thử đăng nhập

## Improper Handling of Exceptional Conditions (CWE-755)

Khi xử lý logic, hoặc wrap các tác vụ cần nhiều thời gian xử lý, hay connect tới các bên thứ 3, đọc file không thể tránh khỏi việc gặp các ngoại lệ, lỗi. Nếu xử lý các ngoại lệ này không đúng cách có thể mang đến lỗi business, crash hệ thống, hoặc rò rỉ thông tin, lỗ hổng

Các trường hợp thường bị đó là: lỗi kết nối mạng, truy cập các tài nguyên không hợp lệ, các ngoại lệ khi xử lý dữ liệu, hoặc người dùng nhập dữ liệu bất thường 

Nếu không xử lý mà bỏ qua các lỗi này có thể gây confuse cho người dùng, thậm chí có thể gây ra mất dữ liệu hoặc tạo ra dữ liệu không phù hợp 

Cách khắc phục: 
+ Cần đảm bảo xử lý exception đúng cách

## Incorrect Authorization (CWE-863) 

Hệ thống không kiểm tra đầy đủ quyền truy cập của user, dẫn đến việc có thể truy cập vào các chức năng nhạy cảm gây ra rủi ro lớn

Ví dụ, chức năng sửa xoá bài viết chỉ có admin được sửa, người dùng chỉ được xem. Nếu hệ thống không kiểm tra đúng quyền người dùng có thể sửa xoá dữ liệu.

Cách khắc phục:
+ Kiểm tra phần quyền đầy đủ trước khi thực hiện thao tác bất kỳ
+ Không được kiểm tra quyền dựa trên dữ liệu người dùng nhập

## Authorization Bypass Through User-Controlled Key (CWE-639)

Là lỗi mà người dùng có thể lợi dụng id để truy cập vào các tài nguyên khác không thuộc quyền của mình

Giả sử hệ thống build một page profile?user_id=1 để hiển thị thông tin user. Nếu như hệ thống dựa vào user_id mà không check quyền xem liệu user_id đó có trùng với user_id đang đăng nhập không thì kẻ xấu có thể lợi dụng mà sửa user_id để truy cập thông tin trái phép

Cách khắc phục:
+ Kiểm tra quyền truy cập đầy đủ
+ Sử dụng session hoặc token thay vì dựa vào param user_id để nhận dạng

## Permissive Cross-domain Policy with Untrusted Domains (CWE-942)

Khi hệ thống cho phép các tên miền khác không đánh tin cậy truy cập vào. Lỗi này liên quan đến việc cấu hình CORS

Tránh sử dụng 
```
Access-Control-Allow-Origin: *
```

Cách khắc phục:
+ Cần cấu hình CORS chặt chẽ, chỉ cho phép các tên miền đáng tin cậy
