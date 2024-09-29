---
title: Tìm Hiểu B-Tree và Cấu Trúc Dữ Liệu Trong SQLite
author: DungNT
---

## Tản mạn về B-Tree

Dữ liệu được lưu trữ dưới ổ đĩa (disk) nên các cơ sở dữ liệu cần tối ưu hoá truy cập I/O do đó họ sử dụng cấu trúc dữ liệu B-Tree hoặc B+ tree.

B-tree là một cây cân bằng giúp cho việc search, insert, delete hiệu quả với độ phức tạp O(logN), đặc điểm chính của nó là một Node có nhiều Keys và con trỏ (trỏ tới các node con), các node lá đều có cùng độ sâu 

![b-tree image](https://www.cs.cornell.edu/courses/cs3110/2012sp/recitations/rec25-B-trees/images/B-trees.gif)

Các thành phần của B-Tree:

Root Node: là node đầu tiên của cây, nếu dữ liệu ít độ sâu của cây = 0 thì root node cũng là leaf node
Interior Node: đây là node nằm ở giữa root và leaf chứa các keys và con trỏ tới các node con (interior node khác hoặc leaf node)
Leaf Node: đây là các node cuối ở cây, không có con trỏ chỉ chứa dữ liệu
Keys: là các giá trị để xác định xem đường đi tiếp theo trong cây, hoặc lấy dữ liệu, các keys được sắp xếp dữ liệu tăng dần
Pointer: là các con trỏ dùng để xác định liên kết giữa các node con nhỏ hơn hoặc lớn hơn, số lượng pointer được xác định bằng số lượng của keys + 1
Degree: quyết định số lượng tối thiểu và tối đa của keys trong node

## Cấu trúc DB file SQLITE

Mọi dữ liệu đều được SQLite lưu trữ duy nhất trong một file trên disk, ngoài ra sẽ có file thứ 2 dùng để lưu thông tin log transaction

Các định nghĩa trong SQLite B-Tree có thể tương ứng so với B-Tree như sau:

### Page

Là một thành phần, đơn vị lưu trữ dữ liệu, mỗi page có kích thước cố định tuỳ thuộc vào cấu hình. Ta có thể hiểu một page là một node tương ứng với B-Tree

![page image](https://storage.googleapis.com/zenn-user-upload/eaac109a05be-20240809.png)

Riêng trong page 1 sẽ khác biệt so với các page còn lại đó là 100 byte đầu tiên sẽ chứa thông tin về File Database được gọi là Database Header (chứa các thông tin như page size, format,...)

#### Page Header

Mỗi page sẽ đều sẽ có page header lưu thông tin về page 

![page header format](https://storage.googleapis.com/zenn-user-upload/bd61dfc9a400-20240809.png)

+ Byte đầu tiên của page header sẽ chứa thông tin về loại của B-tree Page để xác định xem đây là interior page hay leaf page (index/table)
+ 2 byte từ offset 3 cung cấp thông tin về số lượng cells (các bản ghi) có được trong page
+ 4 byte từ offset thứ 8 chỉ xuất hiện ở các interior page(node) để đưa ra rightmost pointer trỏ đến page mà có các keys (RowId) lớn hơn

#### Cell

Cell chính là nơi lưu trữ dữ liệu (keys) của các page(node), là một mảng lưu trữ các thông tin về left child pointer (trỏ đến các node có keys nhỏ hơn), RowId, và Data.

Link dưới đây là chi tiết lưu trữ của một page

https://saveriomiroddi.github.io/SQLIte-database-file-format-diagrams/


Lấy ví dụ về Table leaf page như hình dưới đây:

![leaf page](https://storage.googleapis.com/zenn-user-upload/f672e759cb1e-20240809.png)

Chúng ta có thể lấy dữ liệu theo từng cột bằng cách như sau:

Dựa vào Serial Types trong Payload ta xác định được từng type của các cột (columns), từ đó đọc các byte tiếp theo để xác định từng giá trị.

![serial type format](https://storage.googleapis.com/zenn-user-upload/bdc440929a7f-20240809.png)

Ở format phía trên ta quan tâm chính đến các type sau:

+ Serial Type = 0 thì sẽ lưu trữ giá trị null
+ Các type từ 1 -> 6 sẽ lưu các giá trị interger theo từng loại
+ Với các giá trị string thì sẽ được xác định nếu như Serial Type >= 12 và là số chẵn, ta sẽ xác định được độ dài (bytes) của string bằng công thức (N - 13) / 2

![overview b-tree page](https://chi.cs.uchicago.edu/_images/rightpage.png)
Tổng quan về một table B-Tree








