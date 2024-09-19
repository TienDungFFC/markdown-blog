## Creational Design Pattern

Nhóm này cung cấp các cơ chế để khởi tạo object linh hoạt và dễ tái sử dụng hơn

### Simple Factory Pattern

Mẫu thiết kế này cung cấp một class và phương thức duy nhất để chịu trách nhiệm khởi tạo ra object

Mục đích sử dụng:

```
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
