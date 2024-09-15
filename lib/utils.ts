import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function stringToSlug(str: string) {
  // Chuyển toàn bộ chuỗi sang chữ thường
  str = str.toLowerCase();

  // Thay thế các ký tự có dấu thành không dấu
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // Thay thế các ký tự đặc biệt, khoảng trắng, dấu gạch ngang không cần thiết
  str = str
    .replace(/[^a-z0-9\s-]/g, "") // Xóa tất cả các ký tự không phải chữ cái, số, dấu cách, hoặc dấu gạch ngang
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-"); // Xóa các dấu gạch ngang dư thừa

  // Trả về chuỗi slug đã được tối ưu
  return str.trim();
}
