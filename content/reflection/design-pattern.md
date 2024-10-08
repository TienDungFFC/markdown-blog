---
title: "Design Pattern"
author: "DungNT"
---

## Creational Design Pattern

Nhóm này cung cấp các cơ chế để khởi tạo object linh hoạt và dễ tái sử dụng hơn

### Simple Factory Pattern

Mẫu thiết kế này cung cấp một class và phương thức duy nhất để chịu trách nhiệm khởi tạo ra object

Mục đích sử dụng:
+ Sử dụng trong trường hợp chưa biết trước đối tượng nào sẽ được khởi tạo

```php
<?php

interface AuthProvider {
	public function authenticate();
}

class OAuth implement AuthProvider {
	public function authenticate() {
	// implementing authenticate
	}
}

class EmailAuth implement AuthProvider {
	public function authenticate() {
	}
}

class AuthFactory {
	public function make($type) {
		switch ($type) {
			case "oauth":
				return new OAuth();
			case "email":
				return new EmailAuth();
			default:
			throw new Exception("Unknown authentication type: ", $type);
		}
	}
}

$authFactory = new AuthFactory();
$oAuth = $authFactory->make("oauth");
$oAuth ->authenticate();
```

### Factory Method Pattern

```php
interface Payment {
	public function pay();
}
abstract class PaypentFactory {
	abstract public function makePayment();

	public function pay() {
		Payment payment = makePayment();
		payment.pay();
	}
}

class MomoFactory extends PaymentFactory {
	public function makePayment() {
		return new MomoPayment();
	}
}

class VNPay extends PaymentFactory {
	public function makePayment() {
		return new VNPay();
	}
}

class MomoPayment implements Payment {
	public function pay() {}
}

class VNPay implements Payment {
	public function pay() {}
}
```

### Builder

**Trường hợp sử dụng**:

+ Khi tham số truyền vào constructor quá nhiều
+ Khi cần thay đổi giá trị trong quá trình khởi tạo
+ Có thể khởi tạo các thuộc tính tùy chọn

```php
interface QueryBuilder {
	 public function select(string $table, array $fields): SQLQueryBuilder;
	 public function where(string $field, string $value, string $operator = '='): SQLQueryBuilder;
     public function limit(int $start, int $offset): SQLQueryBuilder;
	 public function getSQL(): string;
}

class MysqlQueryBuild implements QueryBuilder {
	private $query;

	privatefunction reset(): void
    {
        $this->query = new \stdClass();
    }
    public function select(string $table, array $fields): SQLQueryBuilder
    {
        $this->reset();
        $this->query->base = "SELECT " . implode(", ", $fields) . " FROM " . $table;
        $this->query->type = 'select';
        return $this;
    }
     public function where(string $field, string $value, string $operator = '='): SQLQueryBuilder
    {
        if (!in_array($this->query->type, ['select', 'update', 'delete'])) {
            throw new \Exception("WHERE can only be added to SELECT, UPDATE OR DELETE");
        }
        $this->query->where[] = "$field $operator '$value'";
        return $this;
    }
    public function limit(int $start, int $offset): SQLQueryBuilder
    {
        if (!in_array($this->query->type, ['select'])) {
            throw new \Exception("LIMIT can only be added to SELECT");
        }
        $this->query->limit = " LIMIT " . $start . ", " . $offset;

        return $this;
    }
    public function getSQL(): string
    {
        $query = $this->query;
        $sql = $query->base;
        if (!empty($query->where)) {
            $sql .= " WHERE " . implode(' AND ', $query->where);
        }
        if (isset($query->limit)) {
            $sql .= $query->limit;
        }
        $sql .= ";";
        return $sql;
    }
}

function clientCode(QueryBuilder $queryBuilder) {
    $query = $queryBuilder
        ->select("users", ["name", "email", "password"])
        ->where("age", 18, ">")
        ->where("age", 30, "<")
        ->limit(10, 20)
        ->getSQL();

    echo $query;
}
```

### Singleton 

Là một mẫu thiết kế đảm bảo rằng mỗi một class chỉ có duy nhất một instance trong toàn bộ lifecycle của applicaiton
Điều này phù hợp khi chỉ cần một instance để sử dụng 

Trường hợp sử dụng:
+ Kết nối cơ sở dữ liệu: Mỗi lần thiết lập kết nối lại phải tốn thêm tài nguyên (ram, cpu, network) vậy nên sử dụng singleton đảm bảo giữ được 1 kết nối duy nhất được sử dụng
```php
class Database {
    private static $instance = null;
    private $connection;

    private function __construct() {
        $this->connection = new PDO('mysql:host=localhost;dbname=test', 'user', 'pass');
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }
}
```
+ Config, Logger