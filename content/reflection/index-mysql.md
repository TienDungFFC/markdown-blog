---
title: Ngẫm về Index trong Mysql
author: DungNT
---

Index giống như là một mục lục trong một cuốn sách, trong Mysql thì index được implement theo cấu trúc dữ liệu đặc biệt và được lưu trữ trên ổ đĩa công dụng chính là giúp cho việc truy vấn dữ liệu được nhanh hơn.


## Các thể loại index

Hiện tại chỉ viết về các loại index mà InnoDB hỗ trợ:
Về mặt lưu trữ dữ liệu vật lý thì sẽ chia ra làm 2 loại trong: 

### Clustered Index

Là một cấu trúc đặc biệt mà dữ liệu thực tế lưu cùng với chỉ mục theo thứ tự vật lý trên ổ đĩa. Tức là các record sẽ được lưu tuần tự theo thứ tự tăng dần của của cột được đánh chỉ mục (thường là primary key) Ví dụ: các field dữ liệu của bản ghi có id = 2 thì sẽ nằm ngay các dữ liệu bản ghi id = 1. 

Đặc điểm chính:
+ Một table sẽ chỉ có một clustered index
+ Chỉ mục chính mặc định là primary key, trường hợp không có thì sẽ sử dụng cột được đánh unique, nếu unique còn không có thì sẽ sẽ sử dụng cột hidden với giá trị được tăng dần làm chỉ mục

![clustered index](https://vladmihalcea.com/wp-content/uploads/2021/04/ClusteredIndexTable.png)

Lấy ảnh bên trên phân tích với id (primary key) là chỉ mục chính được implement theo cấu trúc dữ liệu B+ Tree:

- Root Node, và Interior Node đều chứa các giá trị id (keys), cùng với các con trỏ tới các Node chứa keys giá trị lớn hơn hoặc nhỏ hơn, nhưng không chứa dữ liệu thực tế. Đặc biệt thì Root Node sẽ chứa các id (keys) trung vị,
- Leaf Node là nơi lưu trữ dữ liệu thực tế, không có các left hay right pointer trỏ tới các Node con, nhưng có pointer trỏ tới leaf node tiếp theo

### Non-Clustered Index (Secondary Index)

Đây là loại index sẽ dùng cột được đánh index làm các keys trong Node và chứa các pointer trỏ đến vị trí của các hàng dữ liệu thực sự trong bảng. 

Đặc điểm chính:
+ Một table sẽ có nhiều clustered index
+ Tối ưu hoá cho các truy vấn cho các cột khác primary key

![non-clustered](https://vladmihalcea.com/wp-content/uploads/2021/04/ClusteredIndexSecondaryIndex.png)

Theo hình ảnh minh hoạ bên trên:

Ta thấy được cột First Name đã được đánh Index, vậy thì khi truy vấn theo điện kiện giả sử là First Name = 'Patrick' thì ta sẽ đi từ Root Node với key là John, ở đây ta thấy Patrick > John sắp xếp theo ký tự alphabet nên sẽ đi tiếp phía bên phải của Tree. Tiếp tục, ta lại gặp Node với key là Robert, so sánh thì ta thấy Patrick < Robert do đó đi tiếp Node left child node của Robert. Từ đây ta đến được Leaf Node mang key là Patrick và mang giá trị là id (16) của record có chứa ông tên là Patrick






