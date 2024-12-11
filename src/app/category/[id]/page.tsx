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
import { useRef } from "react";
import styles from "../../../styles/category.module.scss";
import ReactCodeBlock from "../../../components/ReactCodeBlock";
import ScrollSpy from "../../../widgets/ScrollSpy";

export default function Category() {
  const params = useParams();
  const { data } = useGetTableById<Article>("article", params.id as string);
  const scrollSpy = useRef<Array<{ id: string; tag: string; text: string }>>(
    [],
  );

  const transform: HTMLReactParserOptions["replace"] = (domNode, index) => {
    if (domNode.type === "tag" && (domNode as Element).name === "code") {
      const element = domNode.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      return (
        <code className={styles.contents_code}>
          <CodeBox dots>
            <ReactCodeBlock
              text={nodeInReact as string}
              language="typescript"
            />
          </CodeBox>
        </code>
      );
    }
    if (domNode.type === "tag" && (domNode as Element).name.startsWith("h")) {
      const element = domNode.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      const Tag = (domNode as Element).name as keyof JSX.IntrinsicElements; // h1, h2 등 동적 태그
      const id = `${Tag}-${index}`;
      if (!scrollSpy.current.map((el) => el.id).includes(id)) {
        scrollSpy.current.push({ id, tag: Tag, text: nodeInReact as string });
      }
      return <Tag id={id}>{nodeInReact}</Tag>;
    }

    if (domNode.type === "tag" && (domNode as Element).name === "p") {
      const element = domNode.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      return <div>{nodeInReact}</div>;
    }

    return domNode; // 변경하지 않을 경우 원래 태그 반환
  };
  return (
    <div className={styles.category}>
      <ScrollSpy scrollList={scrollSpy.current} />
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
