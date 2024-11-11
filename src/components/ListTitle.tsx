"use client";

import { usePathname } from "next/navigation";

export default function ListTitle() {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <>
        <h1>{`It's Minus blog!`}</h1>
        <p>
          study, article, components, and others.
          <br />
          blah blah is example text blah. blah is example text.
          <br />
          blah blah is example text blah.
          <br />
          blah blah is example text blah.blah blah is example text blah.
        </p>
      </>
    );
  }
}
