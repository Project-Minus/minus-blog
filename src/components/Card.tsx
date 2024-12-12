import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { convertPContent } from "@/utils/convertTag";
import Image from "next/image";
import styles from "../styles/card.module.scss";
import tt from "../../public/typescript.svg";

interface Props {
  article: Article;
}
export default function Card({ article }: Props) {
  const transform: HTMLReactParserOptions["replace"] = (domNode, index) => {
    if (!(domNode as Element).childNodes) {
      return domNode;
    }

    if (
      domNode.type === "tag" &&
      (domNode.name === "h1" || domNode.name === "h2")
    ) {
      const element = domNode?.childNodes as Array<DOMNode>;
      const nodeInReact = domToReact(element);
      const Tag = domNode.name as keyof JSX.IntrinsicElements; // h1, h2 등 동적 태그
      const id = `${Tag}-${index}`;
      return <Tag id={id}>{nodeInReact}</Tag>;
    }

    return domNode; // 변경하지 않을 경우 원래 태그 반환
  };
  return (
    <div className={styles.card}>
      <Image src={tt} alt="logo" />
      <div>
        <div className={styles.title}>{article.title}</div>
        <div className={styles.desc}>
          {parse(convertPContent(article.description), { replace: transform })}
        </div>
        <div className={styles.date}>{convertTime(article.created_at)}</div>
      </div>
    </div>
  );
}
