import { Article } from "@/type/tableType";
import { convertTime } from "@/utils/time";
import parse, {
  DOMNode,
  domToReact,
  Element,
  HTMLReactParserOptions,
} from "html-react-parser";
import { convertPContent } from "@/utils/convertTag";
import "../styles/card.scss";
import Link from "next/link";
import CodeBox from "./CodeBox";

interface Props {
  article: Article;
}
export default function Card({ article }: Props) {
  const transform: HTMLReactParserOptions["replace"] = (domNode, index) => {
    if (!(domNode as Element).childNodes) {
      return domNode;
    }
    if (domNode.type === "tag" && domNode.name === "iframe") {
      return <></>;
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

  const getCategory = () => {
    if (!article.category) {
      return "Minus";
    }

    const categoryFirstChar = article.category[0];
    const categoryRestChar = article.category.substring(1);
    return categoryFirstChar.toUpperCase() + categoryRestChar;
  };
  return (
    <CodeBox
      dots={false}
      title={getCategory()}
      style={{ boxShadow: "0px 3px 30px rgba(0,0,0,0.2)" }}
    >
      <div className="card">
        <Link href={`/category/${article.id}`}>
          <div className="card_content">
            <div className="card_title">{article.title}</div>
            <div className="card_desc">
              {parse(convertPContent(article.description), {
                replace: transform,
              })}
            </div>
            <div className="card_date">{convertTime(article.created_at)}</div>
          </div>
        </Link>
      </div>
    </CodeBox>
  );
}
