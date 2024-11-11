"use client";

import { useGetTable } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import styles from "../styles/articleList.module.scss";

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
    <div className={styles.articles}>
      {dummy?.map((item, index) => {
        const key = `${item.title}-${index}`;
        return (
          <div className={styles.articleItem} key={key}>
            <p className={styles.articleTitle}>{item.title}</p>
            <p className={styles.articleDesc}>
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
            <p className={styles.articleTime}>{convertTime(item.created_at)}</p>
          </div>
        );
      })}
    </div>
  );
}
