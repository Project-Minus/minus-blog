"use client";

import { useGetTable } from "@/api/useGetTable";
import styles from "@/styles/flotingAside.module.scss";
import { Category } from "@/type/tableType";

export default function FloatingAside() {
  const { data } = useGetTable("category");
  const asideData = data as Array<Category>;

  return (
    <aside className={styles.aside}>
      <div className={styles.asideList}>
        {asideData?.map((aside, index) => {
          const key = `${aside.name}-${index}`;
          return (
            <div className={styles.asideItem} key={key}>
              <p className={styles.asideTitle}>{aside.name}</p>
              <div className={styles.asideBox}>
                {aside.sub_category?.map((subCategory) => {
                  return (
                    <p className={styles.asideItem} key={key}>
                      {subCategory}
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.asideSearch}>
        <input type="text" />
      </div>
    </aside>
  );
}
