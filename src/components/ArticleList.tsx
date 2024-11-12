"use client";

import { useGetTable } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import Link from "next/link";
import styles from "../styles/mainList.module.scss";

export default function ArticleList() {
  const { data } = useGetTable<Article>("article");
  const articleData = data ? (data as Array<Article>) : [];
  return (
    <>
      {articleData?.map((item, index) => {
        const key = `${item.title}-${index}`;
        return (
          <Link key={key} href={`/category/${item.id}`}>
            <div className={styles.mainItem}>
              <p className={styles.mainTitle}>{item.title}</p>
              <p className={styles.mainDesc}>
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
                {item.description}
              </p>
              <p className={styles.mainTime}>{convertTime(item.created_at)}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
