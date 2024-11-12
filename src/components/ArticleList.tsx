"use client";

import { useGetTable } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import styles from "../styles/mainList.module.scss";

export default function ArticleList() {
  const { data } = useGetTable<Article>("article");
  const articleData = data ? (data as Array<Article>) : [];
  const dummy = [
    ...articleData,
    ...articleData,
    ...articleData,
    ...articleData,
    ...articleData,
    ...articleData,
  ];
  return (
    <>
      {dummy?.map((item, index) => {
        const key = `${item.title}-${index}`;
        return (
          <div className={styles.mainItem} key={key}>
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
        );
      })}
    </>
  );
}
