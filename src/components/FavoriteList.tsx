"use client";

import { useFilterContainTable } from "@/api/useFilterContainTable";
import { Article } from "@/type/tableType";
import { useEffect, useState } from "react";
import Card from "./Card";
import styles from "../styles/favoriteList.module.scss";
import ListTitle from "./ListTitle";

export default function FavoriteList() {
  const [favorites, setFavorites] = useState<Array<string>>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getList = window.localStorage.getItem("favorite");
      const favoriteList = getList ? JSON.parse(getList) : [];
      setFavorites(favoriteList);
    }
  }, []);
  const { data } = useFilterContainTable<Article>("article", "id", favorites);
  const articleData = data || [];

  return (
    <div className={styles.favoriteList}>
      <ListTitle text="Favorites" />
      {!articleData?.length && (
        <div className={styles.favoriteListEmpty}>
          Save your favorite articles!
        </div>
      )}
      {articleData.map((article, index) => {
        const key = `${article.title}-${article.created_at}-${index}`;
        return <Card key={key} article={article} />;
      })}
      <span />
    </div>
  );
}
