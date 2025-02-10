"use client";

import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import Link from "next/link";
import { useSidebarStore } from "@/store/sidebarStore";
import { useQuery } from "@tanstack/react-query";
import { getAllTable } from "@/api/init";
import { useEffect, useMemo, useState } from "react";
import Dompurify from "dompurify";
import styles from "../styles/mainList.module.scss";

export default function ArticleList() {
  const { data: tableData } = useQuery({
    queryKey: ["articleTable"],
    queryFn: () => getAllTable("article").catch(console.error),
  });
  const { category, search } = useSidebarStore();
  const [sanitizedDescriptions, setSanitizedDescriptions] = useState<
    Record<number, string>
  >({});

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
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sanitizedData: Record<number, string> = {};
      articleData.forEach((item, index) => {
        sanitizedData[index] = Dompurify.sanitize(item.description);
      });
      setSanitizedDescriptions(sanitizedData);
    }
  }, [articleData]);
  return (
    <>
      {articleData?.length < 1 && (
        <div className={styles.mainEmpty}>
          There are no registered articles yet!
          <br />
          Please wait a little longer!
        </div>
      )}
      {articleData &&
        articleData.map((item, index) => {
          const key = `${item.title}-${index}`;
          return (
            <Link
              className={styles.mainLink}
              key={key}
              href={`/category/${item.id}`}
            >
              <div style={{ width: "100%" }}>
                <p className={styles.mainTitle}>{item.title}</p>
                <div className={styles.mainDesc}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitizedDescriptions[index] || "",
                    }}
                  />
                </div>
                <p className={styles.mainTime}>
                  {convertTime(item.created_at)}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
}
