# Thiết kế hướng nghiệp vụ với laravel

Dựa theo tư tưởng của DDD đó là thiết kế úng dụng xoay quanh nghiệp vụ, mô hình hoá phần mềm sao cho đúng với nghiệp vụ nhất.

Việc mà nghiệp vụ liên tục thay đổi và mở rộng dẫn đến ứng dụng ngày càng phức tạp và chồng chéo lên nhau nên khó quản lý và bảo trì, dev mới vào tìm hiểu nghiệp vụ và đọc code cũng rất khó khăn ngay cả khi có doccument. 

Theo cách tiếp cận với DDD, chúng ta cần design các class name, method, variable nên có ngữ nghĩa giống với bussiness logic. Và khi phối hợp với cac bên giữa team kỹ thuật (devs), QA, PO, khách hàng cần phải đưa ra một ngôn ngữ chung nhất để có hiểu nhau nhất có thể để đưa ra sản phẩm đúng với nghiệp vụ tránh hiểu lầm dẫn tới sửa đi sửa lại.

Với cấu trúc thường thấy laravel hiện tại khi đối mặt với dự án trung bình trở lên sẽ gặp phải tình trạng hàng nghìn dòng code trong file controller, model, service rất khó để debug hay đọc code hay để mở rộng. Khi dev mới join dự án cũng khó để tìm logic nghiệp vụ, khi phải trace từ file routes -> controller -> đọc function để xem xử lý logic gì, nếu mà viết và đặt tên không chuẩn thì còn khó khăn hơn nữa

## Refactor ứng dụng Laravel

Tầng Domain sẽ là nơi trung tâm xử lý nghiệp vụ của hệ thống

1. Entities

Là các lớp đại diện cho các thực thể trong nghiệp vụ

```
namespace App\Domains\Orders\Entities;

class Order
{
    private $status;
    private $totalAmount;

    public function __construct($totalAmount)
    {
        $this->totalAmount = $totalAmount;
        $this->status = 'pending'; // Đơn hàng bắt đầu ở trạng thái 'pending'
    }

    // Logic nghiệp vụ thay đổi trạng thái đơn hàng
    public function completeOrder()
    {
        if ($this->status === 'pending') {
            $this->status = 'completed';
        } else {
            throw new \Exception("Order cannot be completed.");
        }
    }

    // Logic nghiệp vụ tính tổng đơn hàng
    public function getTotalAmount()
    {
        return $this->totalAmount;
    }
}
```
2. Value Objects

Là một object dùng để chứa dữ liệu mang đặc tính immutable, nếu 2 object có value giống như thì sẽ bằng nhau

```
namespace App\Domains\Orders\ValueObjects;

class OrderItem
{
    private $productId;
    private $quantity;
    private $unitPrice;

    public function __construct($productId, $quantity, $unitPrice)
    {
        $this->productId = $productId;
        $this->quantity = $quantity;
        $this->unitPrice = $unitPrice;
    }

    // Logic tính tổng giá trị của sản phẩm
    public function getTotalPrice()
    {
        return $this->quantity * $this->unitPrice;
    }
}
```

3. Actions

Đây là nơi sẽ xử lý logic phức tạp mà không thuộc về entity hay value object ví dụ.
Đặt tên action như một use-case để thể hiện luôn nghiệp vụ mà nó xử lý. Mỗi một action sẽ xử lý một nghiệp vụ


```
namespace App\Domains\Order\Actions;
class CalculateShippingCostAction
{
    public function execute($weight, $distance): float
    {
        // Đây là logic nghiệp vụ tính phí vận chuyển
        return ($weight * 0.5) + ($distance * 0.1);
    }
}

```

4. Repositories

Các interface của repository sẽ được đặt tại tầng Domain

```
namespace App\Domains\Orders\Repositories;

use App\Domains\Orders\Entities\Order;

interface OrderRepository
{
    public function save(Order $order): void;
    public function findById($orderId): ?Order;
}
```

Các lớp repository sử dụng eloquent hay các orm khác sẽ đẩy xuống tầng infra implement:

```
namespace App\Infrastructure\Repositories;

use App\Domains\Orders\Repositories\OrderRepository;
use App\Domains\Orders\Entities\Order;
use App\Models\EloquentOrder; // Đây là model Eloquent của Laravel

class EloquentOrderRepository implements OrderRepository
{
    public function save(Order $order): void
    {
        $eloquentOrder = new EloquentOrder();
        $eloquentOrder->id = $order->getId();
        $eloquentOrder->total_amount = $order->getTotalAmount();
        $eloquentOrder->save();
    }

    public function findById($orderId): ?Order
    {
        $eloquentOrder = EloquentOrder::find($orderId);
        if (!$eloquentOrder) {
            return null;
        }

        return new Order($eloquentOrder->id, $eloquentOrder->products, $eloquentOrder->total_amount);
    }
}
```