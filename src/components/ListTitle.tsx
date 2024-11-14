"use client";

import { usePathname } from "next/navigation";

export default function ListTitle() {
  const pathname = usePathname();

  if (pathname === "/") {
    return <></>;
  }
}
