"use client";

import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import Link from "next/link";
import { useSidebarStore } from "@/store/sidebarStore";
import { useQuery } from "@tanstack/react-query";
import { getAllTable } from "@/api/init";
import { useMemo } from "react";
import styles from "../styles/mainList.module.scss";

export default function ArticleList() {
  const { data: tableData } = useQuery({
    queryKey: ["articleTable"],
    queryFn: () => getAllTable("article").catch(console.error),
  });
  const { category, search } = useSidebarStore();
  const articleData = useMemo(() => {
    if (!tableData) {
      return [];
    }
    const articles = tableData.data as Array<Article>;
    if (category) {
      return articles.filter((article) => article.category === category);
    }
    if (search) {
      return articles.filter(
        (article) =>
          article.title.includes(search) ||
          article.description.includes(search),
      );
    }
    return articles;
  }, [category, tableData, search]);

  return (
    <>
      {articleData?.map((item, index) => {
        const key = `${item.title}-${index}`;
        return (
          <Link
            className={styles.mainLink}
            key={key}
            href={`/category/${item.id}`}
          >
            <div>
              <p className={styles.mainTitle}>{item.title}</p>
              <p className={styles.mainDesc}>{item.description}</p>
              <p className={styles.mainTime}>{convertTime(item.created_at)}</p>
            </div>
          </Link>
        );
      })}
    </>
  );
}
