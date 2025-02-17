"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import "../../styles/layout.scss";
import logo from "../../../public/minus.png";

export default function AppHeader() {
  const [scroll, setScroll] = useState<CSSProperties>({});
  const colorScheme = useMemo(() => {
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) {
        return {
          backgroundColor: "rgba(10,10,10,0.6)",
          color: "#ededed",
        };
      }

      return {
        backgroundColor: "rgba(255,255,255, 0.6)",
        color: "#171717",
      };
    }
    return {
      backgroundColor: "rgba(10,10,10,0.6)",
      color: "#ededed",
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
        <Image src={logo} alt="" />
      </div>
    </header>
  );
}
