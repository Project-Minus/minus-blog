"use client";

import { useGetTableById } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import CodeBox from "@/components/CodeBox";
import { useParams } from "next/navigation";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import styles from "../../../styles/category.module.scss";

export default function Category() {
  const params = useParams();
  const { data } = useGetTableById<Article>("article", params.id as string);

  const transform: HTMLReactParserOptions["replace"] = (domNode) => {
    if (domNode.type === "tag" && (domNode as Element).name === "code") {
      const element = domNode.childNodes as Array<DOMNode>;
      return (
        <CodeBox dots style={{ padding: "10px 15px" }}>
          {domToReact(element)}
        </CodeBox>
      );
    }
    return domNode; // 변경하지 않을 경우 원래 태그 반환
  };

  return (
    <div className={styles.category}>
      <div className={styles.title}>{data?.title}</div>
      <div className={styles.infos}>
        <div className={styles.info}>
          <span>writer name , 6일전</span>
          <button type="button">좋아요</button>
        </div>
      </div>
      <div className={styles.contents_wrapper}>
        {parse(data.description, { replace: transform })}
      </div>
    </div>
  );
}
