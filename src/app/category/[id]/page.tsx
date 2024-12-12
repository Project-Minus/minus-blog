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
import { useEffect, useRef, useState } from "react";
import { convertPContent } from "@/utils/convertTag";
import styles from "../../../styles/category.module.scss";
import ReactCodeBlock from "../../../components/ReactCodeBlock";
import ScrollSpy from "../../../widgets/ScrollSpy";

export default function Category() {
  const params = useParams();
  const articleId = params.id as string;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { data } = useGetTableById<Article>("article", articleId as string);
  const scrollSpy = useRef<Array<{ id: string; tag: string; text: string }>>(
    [],
  );
  const favoriteClass = isFavorite ? styles.favorite : styles.unFavorite;

  useEffect(() => {
    const getList = window.localStorage.getItem("favorite");
    const favoriteList = getList ? JSON.parse(getList) : [];
    if (favoriteList.includes(articleId)) {
      setIsFavorite(true);
    }
  }, [articleId]);

  const handleClickFavorite = () => {
    const favorites = window.localStorage.getItem("favorite");
    if (!favorites) {
      const favoriteJSON = JSON.stringify([articleId]);
      window.localStorage.setItem("favorite", favoriteJSON);
      setIsFavorite(true);
      return;
    }
    if (favorites.includes(articleId as string)) {
      const favoriteJSON: Array<string> = JSON.parse(favorites);
      const removeFavorites = JSON.stringify(
        [...favoriteJSON].filter((el) => el !== articleId),
      );
      window.localStorage.setItem("favorite", removeFavorites);
      setIsFavorite(false);
      return;
    }
    const favoriteJSON: Array<string> = JSON.parse(favorites);
    const addFavorites = JSON.stringify([...favoriteJSON, articleId]);
    window.localStorage.setItem("favorite", addFavorites);
    setIsFavorite(true);
  };

  const transform: HTMLReactParserOptions["replace"] = (domNode, index) => {
    if (!(domNode as Element).childNodes) {
      return domNode;
    }

    if (domNode.type === "tag" && domNode.name === "code") {
      const element = domNode.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      return (
        <code className={styles.contents_code}>
          <CodeBox dots style={{}}>
            <ReactCodeBlock
              text={nodeInReact as string}
              language="typescript"
            />
          </CodeBox>
        </code>
      );
    }

    if (
      domNode.type === "tag" &&
      (domNode.name === "h1" || domNode.name === "h2")
    ) {
      const element = domNode?.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      const Tag = domNode.name as keyof JSX.IntrinsicElements; // h1, h2 등 동적 태그
      const id = `${Tag}-${index}`;
      if (!scrollSpy.current.map((el) => el.id).includes(id)) {
        scrollSpy.current.push({ id, tag: Tag, text: nodeInReact as string });
      }
      return <Tag id={id}>{nodeInReact}</Tag>;
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
          <button
            type="button"
            className={favoriteClass}
            onClick={handleClickFavorite}
          >
            좋아요
          </button>
        </div>
      </div>
      <div className={styles.contents_wrapper}>
        {parse(convertPContent(data.description), { replace: transform })}
      </div>
    </div>
  );
}
