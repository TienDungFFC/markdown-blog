# Ghi chú về Serverless

- **Serverless** = Không cần quản lý server, nhà cung cấp dịch vụ cloud lo hết (như AWS, Google Cloud, Azure).
- Mình chỉ viết code và triển khai. Không cần lo cấu hình server, bảo mật, mở rộng.

## Lợi ích chính:

1. **Không phải lo máy chủ**:
   - Đỡ phải bảo trì, nâng cấp, cài đặt phần mềm, lo downtime, v.v.
   
2. **Tự mở rộng (scaling)**:
   - Khi có nhiều user hoặc yêu cầu tăng đột ngột, hệ thống tự scale. Không cần lo việc server có chịu nổi không.

3. **Trả tiền theo lượng dùng**:
   - Chỉ tốn tiền khi hàm được gọi hoặc khi dùng tài nguyên (rẻ hơn thuê server chạy suốt nếu nhu cầu không đều).

## Một số dịch vụ Serverless nên nhớ:

- **AWS Lambda**: Hỗ trợ nhiều ngôn ngữ, dễ tích hợp với các dịch vụ khác của AWS.
- **Google Cloud Functions**: Dùng cho các project Google Cloud. Tích hợp tốt với dịch vụ Google.
- **Azure Functions**: Serverless của Microsoft, hỗ trợ nhiều ngôn ngữ lập trình.

## Khi nào nên dùng Serverless:
- Ứng dụng không cần chạy liên tục, chỉ chạy khi có request.
- Dự án nhỏ, khởi đầu với ngân sách hạn chế (vì tiết kiệm chi phí).
- Cần tự động scale mà không muốn tự tay quản lý hạ tầng.

=> **Nhớ:** Serverless không thực sự "không có server", chỉ là mình không phải lo về nó thôi!
