---
title: Ghi chú Docker
author: DungNT
---

## 1. Tổng quan về Docker

Docker là một nền tảng mã nguồn mở giúp cho việc đóng gói lại các ứng dụng thành các container, giúp cho việc phát triển, triển khai đồng bộ trên các môi trường

### Lợi ích chính:
- **Portability**: Các container Docker có thể chạy trên bất kỳ máy nào có Docker được cài đặt, trên nhiều môi trường khác nhau.
- **Consistency**: Container đảm bảo môi trường chạy đồng nhất qua các giai đoạn dev, test, prod.
- **Isolation**: Các container được cô lập với nhau, cung cấp tính bảo mật và tránh bị conflict.
- **Flexibility**: Container có thể dễ ràng mở rộng, thay đổi, cập nhật

---

## 2. Các thành phần chính của Docker

### 2.1 Images
- **Images** giống như một template để tạo ra một container, chứa mọi thứ cần thiết để có thể tạo được applicaiton, gồm source code, library, các biến env,..
- **Docker Hub(Registry)** là kho lưu trữ trung tâm, nơi các images được lưu trữ và chia sẻ.

### 2.2 Containers
- **Containers** là một instance của image. Nhẹ, cô lập và có thể được khởi động hoặc dừng nhanh chóng.

### 2.3 Dockerfile
- **Dockerfile** là một file text bao gồm các chỉ dẫn để tạo ra image
  
Ví dụ:
```dockerfile
FROM ubuntu:latest
RUN apt-get update && apt-get install -y nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2.4 Docker Compose
- **Docker Compose** là công cụ dùng để định nghĩa và chạy multi-container. Có thể cấu hình tất cả các dịch vụ trong tệp YAML (`docker-compose.yml`), giúp dễ dàng quản lý và mở rộng các môi trường phức tạp.

Ví dụ `docker-compose.yml`:
```yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
  database:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

---

## 3. Các lệnh Docker cơ bản

### 3.1 Lệnh cơ bản
- **Chạy một container**:
  ```bash
  docker run <image_name>
  ```

- **Liệt kê các container đang chạy (thêm option -a thì liệt kê tất cả các container)**:
  ```bash
  docker ps
  ```
  
- **Dừng một container**:
  ```bash
  docker stop <container_id>
  ```

- **Xóa một container**:
  ```bash
  docker rm <container_id>
  ```

### 3.2 Quản lý Image
- **Kéo một image từ Docker Hub**:
  ```bash
  docker pull <image_name>
  ```

- **Tạo một image từ Dockerfile**:
  ```bash
  docker build -t <image_name> .
  ```

- **Liệt kê các images cục bộ**:
  ```bash
  docker images
  ```

- **Xóa một image**:
  ```bash
  docker rmi <image_name>
  ```

---

## 4. Network

Cung cấp khả năng kết nối, giao tiếp giữa các container 

Docker cung cấp nhiều option cho mạng của container:

- **Bridge Network**: Đậy là loại network mặc định. Khi các container khởi tạo mà không khai báo network thì mặc định sử dụng. Dải IP mặc định là 172.17.0.0/16
- **Host Network**: Chia sẻ namespace network của host với container để tăng hiệu suất.
- **None**: Không sử dụng network
- **Overlay Network**: Cho phép các container trên các Docker hosts khác nhau giao tiếp an toàn và mở rộng.

---

## 5. Volumes

Volumes cho phép dữ liệu tồn tại ngoài vòng đời của container. Quan trọng cho việc lưu trữ dữ liệu cần được chia sẻ giữa các container hoặc tồn tại sau khi container bị xóa.

- **Tạo một volume**:
  ```bash
  docker volume create <volume_name>
  ```

- **Gắn một volume vào container**:
  ```bash
  docker run -v <volume_name>:/path/in/container <image_name>
  ```


## 6. Docker Swarm và điều phối

Docker Swarm là công cụ điều phối và clustering tích hợp của Docker. Cho phép bạn quản lý một nhóm Docker engine như một hệ thống ảo duy nhất.

### Tính năng chính:
- **Scaling**: Dễ dàng mở rộng hoặc thu nhỏ các dịch vụ.
- **Load Balancing**: Tự động phân phối các instance container trên toàn bộ cluster.
- **Service Discovery**: Khám phá dịch vụ DNS tích hợp cho các dịch vụ trong Swarm.

---

## 7. Các best practices khi sử dụng Docker

- **Giảm kích thước Image**: Sử dụng các base image nhỏ như `alpine` để giảm kích thước image.
- **Tận dụng Docker Cache**: Viết Dockerfile hiệu quả để tái sử dụng các lớp và giảm thời gian build.
- **Sử dụng Multi-Stage Builds**: Xây dựng image với nhiều stages để chỉ bao gồm các thành phần cần thiết trong image cuối cùng.
- **Sử dụng Volumes**: Lưu trữ dữ liệu lâu dài bằng cách sử dụng volumes để tránh mất dữ liệu khi container bị xóa.
- **Giới hạn tài nguyên container**: Sử dụng các cờ `--memory` và `--cpus` để giới hạn mức sử dụng tài nguyên của container.

---

## 8. Các công cụ và hệ sinh thái Docker

- **Kubernetes**: Một tool điều phối container thường được sử dụng cùng với Docker để quản lý các ứng dụng quy mô lớn.

---

## 9. Kết luận

Docker đơn giản hóa việc triển khai application bằng cách containerizing phần mềm, đảm bảo tính di động và đồng nhất trên các môi trường khác nhau. Với hệ thống công cụ phong phú, Docker cải thiện quy trình làm việc của nhà phát triển và giúp tối ưu hóa việc mở rộng các ứng dụng.
