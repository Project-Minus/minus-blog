import { useGetCommentByArticleId } from "@/api/useGetTable";
import { sortComment } from "@/utils/sortComment";
import { useState } from "react";
import CommentView from "./CommentView";
import CommnetField from "./CommentField";

interface Props {
  articleId: string;
}

export default function CommentList({ articleId }: Props) {
  const { data } = useGetCommentByArticleId(articleId);
  const [editCommentId, setEditCommentId] = useState<string>("");
  const sortedComment = sortComment(data);
  console.log(editCommentId);
  const changeUpdateMode = (commentId: string) => {
    setEditCommentId(commentId);
  };
  if (sortedComment.length < 1) {
    return null;
  }
  return (
    <div>
      {sortedComment.map((comment) => {
        const { id } = comment;
        if (id === editCommentId) {
          return (
            <CommnetField
              key={comment.id}
              articleId={articleId}
              comment={comment}
              changeUpdateMode={changeUpdateMode}
            />
          );
        }
        return (
          <CommentView
            key={comment.id}
            articleId={articleId}
            comment={comment}
            changeUpdateMode={changeUpdateMode}
          />
        );
      })}
    </div>
  );
}
