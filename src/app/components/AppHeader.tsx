"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import logo from "../../../public/minus.png";
import { headerFont } from "../page";
import "../../styles/layout.scss";

export default function AppHeader() {
  const location = usePathname();
  const currentPath = location.split("/")[1];
  const [theme, setTheme] = useState<"light" | "dark">();
  const [scrollStyle, setScrollStyle] = useState<CSSProperties>({});
  const colorScheme = useMemo(() => {
    if (typeof window !== "undefined") {
      const isDark = theme === "dark";
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
  }, [theme]);

  const applyTheme = (mode: "light" | "dark") => {
    const htmlElement = document.documentElement;

    if (mode === "dark") {
      // OS 설정을 따른다.
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      htmlElement.setAttribute("color-scheme", prefersDark ? "dark" : "light");
    } else {
      // 사용자가 선택한 테마를 강제 적용
      htmlElement.setAttribute("color-scheme", mode);
    }
  };

  const toggleTheme = () => {
    let newTheme: "light" | "dark";

    if (theme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setScrollStyle({});
  };

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") {
        return;
      }
      if (window.scrollY > 1) {
        setScrollStyle({
          backdropFilter: "saturate(180%) blur(5px)",
          ...colorScheme,
        });
      } else {
        setScrollStyle({});
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
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    // 로컬 스토리지에서 테마 정보 가져오기 (기본값: system)
    const storedTheme = localStorage.getItem("theme") || mode;
    setTheme(storedTheme as "light" | "dark");

    // 초기 테마 설정
    applyTheme(storedTheme as "light" | "dark");
  }, []);

  return (
    <header className="header" style={scrollStyle}>
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
        <div
          onClick={toggleTheme}
          onMouseDown={(e) => {
            e.preventDefault();
          }}
        >
          {theme === "dark" ? <AiOutlineSun /> : <AiOutlineMoon />}
        </div>
      </div>
    </header>
  );
}
