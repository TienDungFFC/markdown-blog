---
title: 'OOP'
author: 'DungNT'
---
# OOP là gì

Dựa theo định nghĩa của wiki:

> **Object-oriented programming** (**OOP**) is a [programming paradigm](https://en.wikipedia.org/wiki/Programming_paradigm "Programming paradigm") based on the concept of _[objects](https://en.wikipedia.org/wiki/Object_(computer*science))*,[[1]](https://en.wikipedia.org/wiki/Object-oriented_programming#cite_note-alanKayOnOO-1) which can contain [data](https://en.wikipedia.org/wiki/Data "Data") and [code](https://en.wikipedia.org/wiki/Source-code "Source-code"): data in the form of [fields](<https://en.wikipedia.org/wiki/Field_(computer_science)> "Field (computer science)") (often known as [attributes](<https://en.wikipedia.org/wiki/Attribute_(computing)> "Attribute (computing)") or [properties](<https://en.wikipedia.org/wiki/Property_(programming)> "Property (programming)")), and code in the form of [procedures](<https://en.wikipedia.org/wiki/Procedure_(computer_science)> "Procedure (computer science)") (often known as [methods](<https://en.wikipedia.org/wiki/Method_(computing)> "Method (computing)"))

Dịch ra là: OOP là một mô hình lập trình dựa trên khái niệm về các đối tượng (objects), và các đối tượng chứa dữ liệu (thường hiểu là field, attributes, properties) và các phương thức (method)

## Vậy tại sao lại dùng OOP

Trước khi OOP ra đời thì các lập trình viên code theo phương pháp lập trình thủ tục (procedural programming)

Procedural Programming đơn giản chỉ là các lời gọi hàm lẫn nhau cho nên khó áp dụng cho các bài toán lớn thực tế phức tạp, yêu cầu tính bảo trì, và yêu cầu thay đổi liên tục 

Ví dụ về quản lý ô tô

```js
#include <stdio.h>

// Các biến để lưu trữ dữ liệu về ô tô
char carBrand[20];
int carYear;
float carSpeed;

// Hàm để khởi tạo thông tin về ô tô
void setCar(char brand[], int year, float speed) {
    strcpy(carBrand, brand);
    carYear = year;
    carSpeed = speed;
}

// Hàm để in thông tin ô tô
void printCar() {
    printf("Car Brand: %s\n", carBrand);
    printf("Year: %d\n", carYear);
    printf("Speed: %.2f\n", carSpeed);
}

// Hàm tăng tốc cho ô tô
void accelerate(float increment) {
    carSpeed += increment;
}

int main() {
    // Thiết lập dữ liệu ô tô
    setCar("Toyota", 2020, 120.5);
    
    // In thông tin ô tô
    printCar();
    
    // Tăng tốc ô tô
    accelerate(10.5);
    
    // In thông tin sau khi tăng tốc
    printf("\nAfter accelerating:\n");
    printCar();
    
    return 0;
}
```
Đoạn code trên được tạo bỏi ChatGPT-4

Như đoạn code ở trên việc để tạo ra đối tượng ô tô thì phải lưu trữ ở biến global, dẫn đến việc nếu như ta muốn tạo một đối tượng ô tô khác cần phải tạo thêm các biến khác nên rất khó để quản lý và lặp lại code nhiều

Khi requirement thay đổi liên tục cũng dẫn đến việc thay đổi cấu trúc dữ liệu và các hàm

Ví dụ quản lỳ nhiều xe ô tô chúng ta cần phải sửa lại code
```js
#define MAX_CARS 100

char brands[MAX_CARS][50];
int years[MAX_CARS];
float speeds[MAX_CARS];
int carCount = 0;

// Hàm để thêm thông tin ô tô
void addCar(char* carBrand, int carYear, float carSpeed) {
    strcpy(brands[carCount], carBrand);
    years[carCount] = carYear;
    speeds[carCount] = carSpeed;
    carCount++;
}

// Hàm hiển thị thông tin tất cả các ô tô
void displayCars() {
    for (int i = 0; i < carCount; i++) {
        printf("Car %d:\n", i + 1);
        printf("Brand: %s\n", brands[i]);
        printf("Year: %d\n", years[i]);
        printf("Speed: %.2f km/h\n", speeds[i]);
    }
}

int main() {
    addCar("Toyota", 2020, 120.5);
    addCar("Honda", 2018, 110.0);
    displayCars();
    return 0;
}
```

Khi yêu cầu thêm thông tin loại xe, cần phải thêm tham số vào hàm 

```js
char carTypes[MAX_CARS][20];  // Thêm biến để lưu loại ô tô

// Hàm thêm thông tin xe, bao gồm loại
void addCar(char* carBrand, int carYear, float carSpeed, char* carType) {
    strcpy(brands[carCount], carBrand);
    years[carCount] = carYear;
    speeds[carCount] = carSpeed;
    strcpy(carTypes[carCount], carType);  // Thêm loại xe
    carCount++;
}

// Hiển thị thêm loại xe
void displayCars() {
    for (int i = 0; i < carCount; i++) {
        printf("Car %d:\n", i + 1);
        printf("Brand: %s\n", brands[i]);
        printf("Year: %d\n", years[i]);
        printf("Speed: %.2f km/h\n", speeds[i]);
        printf("Type: %s\n", carTypes[i]);  // Hiển thị loại xe
    }
}

int main() {
    addCar("Toyota", 2020, 120.5, "Sedan");
    addCar("Honda", 2018, 110.0, "SUV");
    displayCars();
    return 0;
}
```

Điều này dẫn đến việc rất khó mở rộng và bảo trì, sự phụ thuộc của biến và các hàm cao dễ phát sinh lỗi

=> Việc OOP ra đời cũng chính là giải pháp để giải quyết các vấn đề bên trên 

## Bốn tính chất của OOP

<img data-zoomable src="https://miro.medium.com/v2/resize:fit:1400/1*KRa8SkP7T646zokicYSqyQ.png" />

### Trừu tượng (Abstraction)

Abstraction là quá trình ẩn giấu đi lớp cài đặt chỉ show ra những thứ cần thiết, giúp người dùng hoặc lập trình viên chỉ tập trung vào **"what"** hơn là **"how"** 

Ví dụ:

```php
interface Payment {
    public function validate();
    public function processPayment();
    public function refund();
}

class ApplePay implements Payment {
    public function validate() {
        return true
    }

    public funcion processPayment() {
        echo "Processing applepay payment";
        return true
    }

    public function refund() {
        echo "Refunding ApplePay"
        return false;
    }
}

class CreditCard implements Payment {}
class Momo implements Payment {}
```

#### Interface và Abstract class 

Interface giống như là một bản hợp đồng bao gồm các hành vi cần phải tuân theo, mỗi khi các class implement interface thì cần phải triển khai đầy đủ các phương thức được khai báo trong interface

Một class có thể triển khai nhiều interface
Interface chỉ có hằng số, và định nghĩa các hàm (không có implement). Phạm vi của các method mặc định và chỉ có public


Abtract Class thì giống như một lớp cơ sở cho các lớp con, nó chia sẻ các thuộc tính, phương thức non-abstract được implement và cũng có định nghĩa các phương thức abstract giúp bắt buộc các lớp con phải triển kai

Abstract Class thì sẽ không khởi tạo được, một class chỉ extend được một abstract class. Phạm vi của abstract method thì có cả private, protected, public

Lợi ích chính của abstraction chính là làm giảm đi sự phức tạp, sự phụ thuộc.

### Đóng gói (Encapsulation)

Tính chất này thể hiện giống như các đối tượng ngoài thế giới thật. Trong thực tế, khi tương tác với các đồ vật chúng ta không cần phải quan tâm bên trong nó được cài đặt thế nào, chỉ cần biết đến chức năng mà nó cung cấp. Ví dụ như khi khởi động xe, bật TV, mọi thiết bị lớp cài đặt đã được cài gói gọn bên trong. Ánh xạ sang OOP thì nó giống như gói gọn lại các thuộc tính của đối tượng và chỉ đưa ra các phương thức cần thiết để có thể sử dụng hành vi của đối tượng đó

Có 3 loại Access Modifier
- Public: Phạm vi này thì ở các lớp bên ngoài cũng có thể truy cập đến thuộc tính của object
- Protected: Các class có quan hệ cha - con thì có thể truy cập đến thuộc tính của lớp cha. Nhưng chỉ truy cập được trong class, còn khi tạo ra 1 instance của object thì ta không thể truy cập trực tiếp được mà cần phải qua phương thức truy cập được cung cấp
- Private: Chỉ trong class định nghĩa thuộc tính thì mới có thể truy cập được

### Kế thừa (Inheritance)

Kế thừa là tạo ra các lớp con dựa trên lớp cha đã có sẵn, nó thừa hưởng các thuộc tính và phương thức của lớp cha.
Lợi ích chính là nó giúp tái sử dụng lại code.

### Đa hình (Polymorphism)

Đa hình là khả năng các lớp khác nhau có thể xử lý các cách khác nhau trên cùng một interface. Nói cách khác, Cùng một phương thức nhưng có thể hoạt động ở các lớp khác nhau và có cách thực thi riêng.


