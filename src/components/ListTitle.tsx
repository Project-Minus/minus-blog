"use client";

import { usePathname } from "next/navigation";

interface Props {
  text: string;
}

export default function ListTitle({ text }: Props) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div>
        <p>{text}</p>
      </div>
    );
  }
}
