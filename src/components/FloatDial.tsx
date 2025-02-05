"use client";

import { AiFillContainer } from "react-icons/ai";
import { BiWindow, BiArea } from "react-icons/bi";
import { CiIndent } from "react-icons/ci";
import { useEffect, useState } from "react";
import styles from "../styles/floatDial.module.scss";

export default function FloatDial() {
  const [hovered, setHovered] = useState<string>("empty");
  const dummy = [
    {
      name: "Popup",
      icon: <BiWindow size={24} />,
    },
    {
      name: "Modal",
      icon: <BiArea size={24} />,
    },
    {
      name: "In docs",
      icon: <CiIndent size={24} />,
    },
  ];

  useEffect(() => {
    document.querySelectorAll("#dial-item").forEach((item, index) => {
      const reverseIndex =
        document.querySelectorAll("#dial-item").length - index;

      (item as HTMLElement).style.setProperty(
        "--reverseIndex",
        String(reverseIndex),
      );
      (item as HTMLElement).style.setProperty("--index", String(index));
    });
  }, []);

  return (
    <div
      className={styles.floatDial}
      style={{ width: 120 }}
      onMouseEnter={() => setHovered("hovered")}
      onMouseLeave={() => setHovered("unHovered")}
    >
      <div className={styles.floatDialList}>
        {dummy.map(({ name, icon }, index) => {
          const key = `${name}_${index}`;
          return (
            <div
              id="dial-item"
              className={`${styles.floatDialItem} ${styles[hovered]}`}
              key={key}
              data-content={name}
            >
              <p>{icon}</p>
            </div>
          );
        })}
      </div>
      <div className={`${styles.floatDialButton} ${styles[hovered]}`}>
        <AiFillContainer size={28} />
      </div>
    </div>
  );
}
