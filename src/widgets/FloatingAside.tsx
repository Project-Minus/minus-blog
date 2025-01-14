"use client";

import { useGetTable } from "@/api/useGetTable";
import CodeBox from "@/components/CodeBox";
import { useSidebarStore } from "@/store/sidebarStore";
import styles from "@/styles/flotingAside.module.scss";
import { Category } from "@/type/tableType";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function FloatingAside() {
  const { data } = useGetTable("category");
  const [searchValue, setSearchValue] = useState<string>("");
  const asideData = data as Array<Category>;
  const { category, setCategory, setSearch } = useSidebarStore();

  return (
    <div className={styles.aside}>
      <CodeBox dots>
        <div className={styles.asideList}>
          {asideData?.map((aside, index) => {
            const key = `${aside.name}-${index}`;
            return (
              <div className={styles.asideItem} key={key}>
                <p className={styles.asideTitle}>{` ${aside.name} `}</p>
                <div className={styles.asideBox}>
                  {aside.sub_category?.map((subCategory, subIndex) => {
                    const subKey = `${key}-${subIndex}`;
                    const itemStyle =
                      category !== subCategory
                        ? styles.asideItem
                        : styles.asideItemActive;
                    return (
                      <p
                        className={itemStyle}
                        key={subKey}
                        onClick={() => {
                          if (category === subCategory) {
                            setCategory("");
                            return;
                          }
                          setCategory(subCategory);
                        }}
                      >
                        {` ${subCategory} `}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CodeBox>
      <CodeBox dots style={{ marginTop: 15 }}>
        <div className={styles.asideSearch}>
          <input
            type="text"
            placeholder="console.log"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchValue(e.target.value);
              if (!e.target.value) {
                setSearch("");
              }
            }}
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setSearch(searchValue);
              }
            }}
          />
        </div>
      </CodeBox>
    </div>
  );
}
