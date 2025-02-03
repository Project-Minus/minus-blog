"use client";

import { usePathname } from "next/navigation";
import styles from "../styles/listTitle.module.scss";

interface Props {
  text: string;
}

export default function ListTitle({ text }: Props) {
  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className={styles.listTitle}>
        <p>{text}</p>
      </div>
    );
  }
}
