"use client";

import { useFilterContainTable } from "@/api/useFilterContainTable";
import CustomCarousel from "@/components/CustomCarousel";
import { Article } from "@/type/tableType";
import { useEffect, useState } from "react";
import styles from "../styles/favoritesCarousel.module.scss";

export default function FavoritesCarousel() {
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
    <div className={styles.favoritesCarousel}>
      {!articleData?.length && <div>Save your favorite articles!</div>}
      {articleData?.length && <CustomCarousel slides={articleData} />}
      <span />
    </div>
  );
}
