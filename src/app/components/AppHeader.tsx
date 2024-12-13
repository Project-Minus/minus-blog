"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useState } from "react";
import styles from "../../styles/layout.module.scss";
import logo from "../../../public/minus.png";

export default function AppHeader() {
  const [scroll, setScroll] = useState<CSSProperties>({});
  const colorScheme = useMemo(() => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? {
          backgroundColor: "rgba(10,10,10,0.6)",
          color: "#ededed",
        }
      : {
          backgroundColor: "rgba(255,255,255, 0.6)",
          color: "#171717",
        };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 1) {
        setScroll({
          backdropFilter: "saturate(180%) blur(5px)",
          ...colorScheme,
        });
      } else {
        setScroll({});
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [colorScheme]);
  return (
    <header className={styles.header} style={scroll}>
      <div>
        <Image src={logo} alt="" />
      </div>
    </header>
  );
}
