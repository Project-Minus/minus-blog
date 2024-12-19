"use client";

import { useGetTable } from "@/api/useGetTable";
import CodeBox from "@/components/CodeBox";
import styles from "@/styles/flotingAside.module.scss";
import { Category } from "@/type/tableType";

export default function FloatingAside() {
  const { data } = useGetTable("category");
  const asideData = data as Array<Category>;

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
                    return (
                      <p className={styles.asideItem} key={subKey}>
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
          <input type="text" placeholder="console.log" />
        </div>
      </CodeBox>
    </div>
  );
}
