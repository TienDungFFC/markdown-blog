---
title: Deadlock là gì và cách để tránh
author: DungNT
---

## Deadlockk?

Xảy ra khi có nhiều transaction chặn lẵn nhau, dẫn đến bế tắc không thể tiếp tục thực thi

Ví dụ, ta có 2 transaction chạy đồng thời:

Ở transaction 1 ta update stock với id = 1 thì lúc này mysql đã giữ lock bản ghi này

![lock1](https://res.cloudinary.com/du2u3feyq/image/upload/v1727624732/lock3_1727624729.png)

Transaction 2 update stock với id = 2, tương tự mysql cũng giữ lock bản ghi

![lock2](https://res.cloudinary.com/du2u3feyq/image/upload/v1727623362/docker2_1727623361.png)

Quay lại transaction 1, ta thực thi update stock ở id = 2

![lock3]https://res.cloudinary.com/du2u3feyq/image/upload/v1727623356/docker1_1727623353.png

Ta thấy rằng câu query chưa được thực hiện vì đang bị transaction 2 giữ lock

Sang transaction2, tiếp tục thực thi update stock với id = 1 thì lúc này deadlock xảy ra

![lock4](https://res.cloudinary.com/du2u3feyq/image/upload/v1727625043/lock4_1727625040.png)

Lý do deadlock là vì ở transaction 1 đang chờ bản ghi id = 2 được trả lại và transaction 2 cũng đang chờ bản ghi id = 1 trả lại dẫn đến 2 transaction chờ lẫn nhau.

## Làm sao để xử lý?

Một số cách để xử lý deadlock: 
- Cần đảm bảo tất cả các transaction truy cập vào tài nguyên theo thứ tự hợp lý:

![handle deadlock](https://res.cloudinary.com/du2u3feyq/image/upload/v1727625592/no-deadlock1_1727625589.png)

![handle deadlock2](https://res.cloudinary.com/du2u3feyq/image/upload/v1727625598/no-deadlock2_1727625596.png)

ở ví dụ trên, việc thực hiện update id = 1 lên trước ở transaction2 sẽ không giữ khoá ở bản ghi id = 2 như ví dụ trước giúp đảm bảo không bị khoá lẫn nhau.

- Retry lại ở application:
Thực hiện phương pháp này có thể giúp hoàn thành transaction sau khi deadlock được giải quyết.

```php
try {
    $pdo->beginTransaction();
// Thực hiện các câu lệnh cập nhật
    $pdo->commit();
} catch (PDOException $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    if ($e->getCode() == '40001') { // Mã lỗi deadlock trong MySQL
    // Thử lại giao dịch
    } else {
        throw $e;
    }
}

```
