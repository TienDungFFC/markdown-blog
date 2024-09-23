import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function stringToSlug(str: string) {
  str = str.toLowerCase();

  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  str = str
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  return str.trim();
}
