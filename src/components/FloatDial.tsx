"use client";

import { AiFillContainer } from "react-icons/ai";
import { useEffect, useState } from "react";
import { DialItemType } from "@/type/dial";
import styles from "../styles/floatDial.module.scss";

interface Props {
  items: Array<DialItemType>;
  currentType: string;
}
export default function FloatDial({ items, currentType }: Props) {
  const [hovered, setHovered] = useState<string>("empty");

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
        {items.map(({ name, icon, onClick }, index) => {
          const key = `${name}_${index}`;
          const isSelected = currentType === name ? "selected" : "";
          return (
            <div
              id="dial-item"
              className={`${styles.floatDialItem} ${styles[hovered]} ${styles[isSelected]}`}
              key={key}
              data-content={name}
              onClick={onClick}
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
