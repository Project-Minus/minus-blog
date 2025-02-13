import { CSSProperties } from "react";
import "../styles/codeLine.scss";

interface Props {
  content: string | JSX.Element | JSX.Element[];
  style?: CSSProperties;
}
export default function CodeLine({ content, style }: Props) {
  return (
    <span className="codeLine" style={style}>
      {content}
    </span>
  );
}
