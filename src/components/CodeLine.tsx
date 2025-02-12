import "../styles/codeLine.scss";

interface Props {
  content: string | JSX.Element | JSX.Element[];
}
export default function CodeLine({ content }: Props) {
  return <span className="codeLine">{content}</span>;
}
