import { sortComment } from "@/utils/sortComment";
import { useState } from "react";
import { Comment } from "@/type/tableType";
import CommentView from "./CommentView";
import CommnetField from "./CommentField";

interface Props {
  articleId: string;
  data: Array<Comment>;
}

export default function CommentList({ articleId, data }: Props) {
  const [editCommentId, setEditCommentId] = useState<string>("");
  const [replyCommentId, setReplyCommentId] = useState<string>("");
  const sortedComment = sortComment(data);
  const changeUpdateId = (commentId: string) => {
    setEditCommentId(commentId);
  };
  const changeReplyId = (commentId: string) => {
    setReplyCommentId(commentId);
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
              changeUpdateId={changeUpdateId}
            />
          );
        }
        return (
          <CommentView
            key={comment.id}
            articleId={articleId}
            comment={comment}
            replyCommentId={replyCommentId}
            changeUpdateId={changeUpdateId}
            changeReplyId={changeReplyId}
          />
        );
      })}
    </div>
  );
}
