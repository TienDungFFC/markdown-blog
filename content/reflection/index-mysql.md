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

### Composite Index

Là một dạng chỉ mục được đánh trên nhiều hơn 1 cột giúp tối ưu hoá trong các câu sử dụng truy vấn nhấn nhiều điều kiện
Có thể coi composite index là clustered index khi có nhiều cột được đánh là 1 primary key

![composite index](https://substackcdn.com/image/fetch/w_1456,c_limit,f_webp,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fbe48f8e9-6d79-4ac2-a8ac-b62c30227ded_1600x983.png)

Điều quan trọng cần để ý là vị trí của các cột được đánh index, nếu lựa chọn hiệu quả thì mới phát huy tốt khả năng sử dụng index

![b-tree](https://imgur.com/b1iLL9m.png)

Ví dụ, ta có bảng order với 1 triệu record như sau:

![order table](https://res.cloudinary.com/du2u3feyq/image/upload/v1727529141/Screenshot%20at%20Sep%2028%2020-12-06_1727529138.png)

Thực thi query (chưa đánh index) lấy các đơn hàng với gía trị < 400 của user_id = 4

```sql
SELECT * FROM ecommerce.orders WHERE total_price < 400 and user_id = 4;
```

Mất 0.172s để đưa ra được kết quả

![result_1](https://res.cloudinary.com/du2u3feyq/image/upload/v1727537595/Screenshot%20at%20Sep%2028%2022-32-55_1727537591.png)

Thử đánh composite index ở 2 cột lần lượt là total_price, user_id

```sql
CREATE INDEX ord_uid_price ON orders(total_price, user_id);
```

Kết quả thu được câu query giảm xuống 0,0074s:

![result2](https://res.cloudinary.com/du2u3feyq/image/upload/v1727537779/Screenshot%20at%20Sep%2028%2022-35-19_1727537778.png)

Tuy nhiên ta có thể tối ưu hơn nữa bằng cách cho cột user_id lên trước:

```sql
CREATE INDEX ord_uid_price ON orders(user_id, total_price);
```

Kết quả giảm xuống 0,0023s:

![result3](https://res.cloudinary.com/du2u3feyq/image/upload/v1727537784/Screenshot%20at%20Sep%2028%2022-36-10_1727537783.png)

Ta có thấy rõ việc để user_id đằng trước giúp thu hẹp khoảng cách nhanh hơn vì chỉ cần so sánh bằng để tìm user_id = 4 rồi từ đó lọc thêm total_price hơn là việc để tìm kiếm các giá trị total_price < 400, sau đó mới tìm các giá trị user_id dẫn đến phải quét qua nhiều bản ghi hơn