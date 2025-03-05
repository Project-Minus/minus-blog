"use client";

import { useGetTable } from "@/api/useGetTable";
import CodeBox from "@/components/CodeBox";
import { useSidebarStore } from "@/store/sidebarStore";
import "@/styles/flotingAside.scss";
import { Category } from "@/type/tableType";
import { ChangeEvent, KeyboardEvent, useState } from "react";

export default function FloatingAside() {
  const { data } = useGetTable("category");
  const [searchValue, setSearchValue] = useState<string>("");
  const asideData = data as Array<Category>;
  const { category, setCategory, setSearch } = useSidebarStore();

  return (
    <div className="aside">
      <CodeBox dots>
        <div className="asideList">
          {asideData?.map((aside, index) => {
            const key = `${aside.name}-${index}`;
            return (
              <div className="asideItem" key={key}>
                <p className="asideTitle">{` ${aside.name} `}</p>
                <div className="asideBox">
                  {aside.sub_category?.map((subCategory, subIndex) => {
                    const subKey = `${key}-${subIndex}`;
                    const itemStyle =
                      category !== subCategory
                        ? "asideItem"
                        : "asideItemActive";
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
        <div className="asideSearch">
          <input
            type="text"
            placeholder="console.log(title)"
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
