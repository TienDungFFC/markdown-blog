"use client"; 
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ActiveLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname(); 
  const isActive = pathname == href; 

  return (
    <Link href={href} className={`${className} ${isActive ? "active text-[#006bff] font-bold" : ""}`}>
      {children}
    </Link>
  );
}
