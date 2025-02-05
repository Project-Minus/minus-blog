"use client";

import { useGetTableById } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import CodeBox from "@/components/CodeBox";
import parse, {
  domToReact,
  Element,
  HTMLReactParserOptions,
  DOMNode,
} from "html-react-parser";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { convertPContent } from "@/utils/convertTag";
import { DialItemType } from "@/type/dial";
import { BiArea, BiWindow } from "react-icons/bi";
import { CiIndent } from "react-icons/ci";
import Modal from "@/components/Modal";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { IFRAME_TYPE } from "@/constants/iframeConstants";
import styles from "../../../styles/category.module.scss";
import ReactCodeBlock from "../../../components/ReactCodeBlock";
import ScrollSpy from "../components/ScrollSpy";
import FloatDial from "../../../components/FloatDial";
import IframeWithLoading from "../components/IframeWithLoading";

interface Props {
  articleId: string;
}
export default function ArticleDetail({ articleId }: Props) {
  const { data } = useGetTableById<Article>("article", articleId as string);
  const [iframeType, setIframeType] = useState<string>(IFRAME_TYPE.inDocs);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { lockScroll, openScroll } = useBodyScrollLock();
  const hasIframe = useMemo(() => {
    return data.description.includes("</iframe>");
  }, [data.description]);
  const scrollSpy = useRef<Array<{ id: string; tag: string; text: string }>>(
    [],
  );
  const favoriteClass = isFavorite ? styles.favorite : styles.unFavorite;
  const dialItems: Array<DialItemType> = [
    {
      name: IFRAME_TYPE.popup,
      icon: <BiWindow size={24} />,
      onClick: () => {
        setIframeType(IFRAME_TYPE.popup);
      },
    },
    {
      name: IFRAME_TYPE.modal,
      icon: <BiArea size={24} />,
      onClick: () => {
        setIframeType(IFRAME_TYPE.modal);
      },
    },
    {
      name: IFRAME_TYPE.inDocs,
      icon: <CiIndent size={24} />,
      onClick: () => {
        setIframeType(IFRAME_TYPE.inDocs);
      },
    },
  ];

  const getIframeUrl = (htmlString: string) => {
    let iframeUrl = "";
    let iframeTitle = "";
    parse(htmlString, {
      replace: (domNode) => {
        if (
          domNode.type === "tag" &&
          domNode.name === "iframe" &&
          domNode.attribs?.src
        ) {
          iframeUrl = domNode.attribs.src ?? "";
          iframeTitle = domNode.attribs.title ?? "";
        }
      },
    });

    return { title: iframeTitle, url: iframeUrl };
  };

  const handleClickFavorite = () => {
    if (typeof window !== "undefined") {
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
    }
  };

  const transform: HTMLReactParserOptions["replace"] = useCallback(
    (domNode: DOMNode, index: number) => {
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
      if (domNode.type === "tag" && domNode.name === "iframe") {
        const { src, title } = domNode.attribs;
        if (iframeType) {
          return (
            <IframeWithLoading
              src={src}
              title={title}
              iframeType={IFRAME_TYPE.inDocs}
            />
          );
        }
        return <></>;
      }

      if (
        domNode.type === "tag" &&
        (domNode.name === "h1" || domNode.name === "h2")
      ) {
        const element = domNode?.childNodes as Array<DOMNode>;
        const nodeInReact = domToReact(element);
        const Tag = domNode.name as keyof JSX.IntrinsicElements; // h1, h2 등 동적 태그
        const elementId = `${Tag}-${index}`;
        if (!scrollSpy.current.map((el) => el.id).includes(elementId)) {
          scrollSpy.current.push({
            id: elementId,
            tag: Tag,
            text: nodeInReact as string,
          });
        }
        return <Tag id={elementId}>{nodeInReact}</Tag>;
      }

      return domNode; // 변경하지 않을 경우 원래 태그 반환
    },
    [iframeType],
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getList = window.localStorage.getItem("favorite");
      const favoriteList = getList ? JSON.parse(getList) : [];
      if (favoriteList.includes(articleId)) {
        setIsFavorite(true);
      }
    }
  }, [articleId]);

  useLayoutEffect(() => {
    if (hasIframe) {
      document.body.style.overflowX = "hidden";
    }

    return () => {
      document.body.style.overflowX = "";
    };
  }, [data, hasIframe]);

  useEffect(() => {
    const { title, url } = getIframeUrl(data.description);
    if (iframeType === IFRAME_TYPE.popup) {
      window.open(url, title, "popup=yes");
    }
  }, [data.description, iframeType]);

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
      {hasIframe && (
        <div>
          ※ 해당 페이지는 component story가 포함되어 있습니다.
          <br />
          브라우저를 100% 크기로 보시기를 권장 드립니다.
          <br />
          또한 우측 하단의 dial을 사용하실 수있습니다.
          <br />
          해당 dial로 원하는 형식의 component story를 고르실 수 있습니다.
        </div>
      )}
      <div className={styles.contents_wrapper}>
        {parse(convertPContent(data.description), {
          replace: transform,
        })}
      </div>
      {hasIframe && (
        <>
          <FloatDial items={dialItems} currentType={iframeType} />
          <Modal
            title={data.title}
            open={iframeType === "Modal"}
            iframeData={data.description}
            size="dynamic"
            background
            onMount={lockScroll}
            onUnMount={openScroll}
            isOneButton
            onClickClose={() => {
              setIframeType(IFRAME_TYPE.inDocs);
            }}
          />
        </>
      )}
    </div>
  );
}
