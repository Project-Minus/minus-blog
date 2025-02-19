import { useGetCommentByArticleId } from "@/api/useGetTable";
import { sortComment } from "@/utils/sortComment";
import CommentView from "./CommentView";

interface Props {
  articleId: string;
}

export default function CommentList({ articleId }: Props) {
  const { data } = useGetCommentByArticleId(articleId);

  const sortedComment = sortComment(data);

  if (sortedComment.length < 1) {
    return null;
  }
  return (
    <div>
      {sortedComment.map((comment) => {
        return <CommentView key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
