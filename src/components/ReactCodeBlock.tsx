import { CodeBlock, railscast } from "react-code-blocks";
import { CopyBlockProps } from "react-code-blocks/dist/components/CopyBlock";

export default function ReactCodeBlock(props: CopyBlockProps) {
  const {
    text,
    language = "typescript",
    showLineNumbers = true,
    startingLineNumber = 1,
  } = props;
  const copyBlockProps = {
    text,
    language,
    showLineNumbers,
    startingLineNumber,
    wrapLines: true,
    theme: railscast,
  };

  return <CodeBlock {...copyBlockProps} />;
}
