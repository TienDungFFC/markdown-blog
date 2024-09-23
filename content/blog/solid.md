---
title: 'SOLID'
author: 'DungNT'
---
## Single Responsibility Principle

Uncle Bob phát biểu rằng: "A class should have only one reason to change"

Hãy cố gắng đảm bảo rằng một class chỉ nên xử lý một nhiệm vụ 

Việc này làm giảm nhiều đi sự phức tạp, sẽ dễ dàng phân tích, đọc code hơn so với nhét 1 đống logic nghiệp vụ vào một class, thậm chí 1 function khiến cho việc code trở nên ngày càng rối rắm và khó tái sử dụng được.

Vậy thì 1 lý do để thay đổi là gì? Đó là khi cần thay đổi logic nghiệp vụ nào đó ta chỉ cần sửa một function (hoặc class) mà nó chịu trách nhiệm thôi.

## Opne-closed principle

"Mở khi mở rộng, đóng lại khi sửa đổi". 

Chúng ta nên có khả năng mở rộng code mà cần phải hạn chế nhất có thể sửa đổi lại code

Để làm được điều này chúng ta cần phải sử dụng interface, kế thừa, áp dụng một số design pattern

## Liskov Substitution Principle

Đại khái nội dung của nguyên lý này là: Class cha có hành vi gì thì thằng con cũng phải tuân thủ theo đó thì khi đó các class con có thể thay thế class cha mà không bị phá vỡ chương trình

## Interface Segregation Principle

"Các client không nên bị ép buộc phải phụ thuộc vào những giao diện mà nó không sử dụng."

Nói cách khác, thay vì tạo ra các giao diện lớn với nhiều phương thức không liên quan đến nhau, chúng ta nên chia nhỏ các giao diện thành các giao diện cụ thể hơn, để các client (lớp hoặc đối tượng sử dụng giao diện) chỉ cần thực hiện những giao diện mà chúng thực sự cần.


## Dependency Inversion Principle

Các lớp cấp cao không nên phụ thuộc vào các lớp cấp thấp, cả 2 nên phụ thuộc vào trừu trượng. Các trừu tượng không phụ thuộc vào các chi tiết, chi tiết phụ thuộc vào trừu tượng 

Nguyên tắc này làm giảm sự phụ thuộc đồng thời làm tăng khả năng tái sử dụng, linh hoạt và mở rộng







