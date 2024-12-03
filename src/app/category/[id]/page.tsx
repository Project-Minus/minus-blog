"use client";

import { useGetTableById } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { useParams } from "next/navigation";
import styles from "../../../styles/category.module.scss";

export default function Category() {
  const params = useParams();
  const { data } = useGetTableById<Article>("article", params.id as string);
  const currentData = data ? data[0] : ({} as Article);

  return (
    <div className={styles.category}>
      <div className={styles.title}>{currentData?.title}</div>
      <div className={styles.infos}>
        <div className={styles.info}>
          <span>writer name , 6일전</span>
          <button type="button">좋아요</button>
        </div>
      </div>
      <span>{currentData?.description}</span>
    </div>
  );
}
