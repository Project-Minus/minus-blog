import CommnetField from "@/components/CommentField";
import CommentList from "@/components/CommentList";

interface Props {
  articleId: string;
}
export default function Comments({ articleId }: Props) {
  return (
    <div>
      <CommnetField articleId={articleId} />
      <CommentList articleId={articleId} />
    </div>
  );
}
