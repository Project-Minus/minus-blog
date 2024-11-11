"use client";

import { useGetTable } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import styles from "../styles/mainList.module.scss";

export default function MainList() {
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
    <div className={styles.mainBox}>
      <h1>{`It's Minus blog!`}</h1>
      <p>
        study, article, components, and others.
        <br />
        blah blah is example text blah. blah is example text.
        <br />
        blah blah is example text blah.
        <br />
        blah blah is example text blah.blah blah is example text blah.
      </p>
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
    </div>
  );
}
