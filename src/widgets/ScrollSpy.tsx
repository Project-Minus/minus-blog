"use client";

import styles from "../styles/category.module.scss";

interface Props {
  scrollList: Array<{ id: string; tag: string; text: string }>;
}

export default function ScrollSpy(props: Props) {
  const { scrollList } = props;
  const handleClickSCrollSpy = (id: string) => {
    document.getElementById(`${id}`)?.scrollIntoView({ block: "center" });
  };
  const leftGap = (tag: string) => {
    switch (tag) {
      case "h1":
        return 0;
      case "h2":
        return 6;
      case "h3":
        return 12;
      case "h4":
        return 18;
      case "h5":
        return 24;
      case "h6":
        return 30;
      default:
        return 0;
    }
  };
  return (
    <div className={styles.scroll_spy}>
      {scrollList?.map(({ id, tag, text }) => {
        return (
          <div
            className={styles.scroll_tags}
            style={{
              marginLeft: leftGap(tag),
            }}
            onClick={() => {
              handleClickSCrollSpy(id);
            }}
            key={id}
          >
            {text}
          </div>
        );
      })}
    </div>
  );
}
