"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../../public/minus.png";
import { headerFont } from "../page";
import "../../styles/layout.scss";

export default function AppHeader() {
  const location = usePathname();
  const currentPath = location.split("/")[1];
  const [scroll, setScroll] = useState<CSSProperties>({});
  const colorScheme = useMemo(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        return {
          backgroundColor: "rgba(10,10,10,0.7)",
          color: "#ededed",
          borderBottom: "rgba(28, 32, 36, 0.3)",
        };
      }

      return {
        backgroundColor: "rgba(255,255,255, 0.7)",
        color: "#171717",
        borderBottom: "rgba(237, 237, 237, 0.3)",
      };
    }
    return {
      backgroundColor: "rgba(10,10,10,0.7)",
      color: "#ededed",
      borderBottom: "rgba(28, 32, 36, 0.1)",
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") {
        return;
      }
      if (window.scrollY > 1) {
        setScroll({
          backdropFilter: "saturate(180%) blur(5px)",
          ...colorScheme,
        });
      } else {
        setScroll({});
      }
    };
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      if (typeof window === "undefined") {
        return;
      }
      window.removeEventListener("scroll", onScroll);
    };
  }, [colorScheme]);

  return (
    <header className="header" style={scroll}>
      <div>
        <Link href="/">
          <Image src={logo} alt="" />
        </Link>
      </div>
      <div className={`${headerFont.className} others`}>
        <Link
          className={`${currentPath === "about" ? "active" : ""}`}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`${currentPath === "manual" ? "active" : ""}`}
          href="/manual"
        >
          Manual
        </Link>
        <Link
          className={`${currentPath === "connect" ? "active" : ""}`}
          href="/connect"
        >
          Connect
        </Link>
      </div>
    </header>
  );
}
