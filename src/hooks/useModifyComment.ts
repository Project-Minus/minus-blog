import { postTableRow, updateTableRowById } from "@/api/init";
import { Comment } from "@/type/tableType";
import { QueryClient } from "@tanstack/react-query";

export const useModifyComment = () => {
  const postComment = async (
    newComment: Partial<Comment>,
    queryClient: QueryClient,
  ) => {
    await postTableRow("comment", newComment);
    queryClient.invalidateQueries({
      queryKey: ["comment", newComment.articleId],
      exact: true,
    });
  };

  const updateComment = async (
    updatedComment: Partial<Comment>,
    queryClient: QueryClient,
  ) => {
    if (!updatedComment.id) {
      return;
    }
    await updateTableRowById("comment", updatedComment, updatedComment.id);
    queryClient.invalidateQueries({
      queryKey: ["comment", updatedComment.articleId],
      exact: true,
    });
  };

  const deleteComment = async (
    articleId: string,
    commentId: string,
    queryClient: QueryClient,
  ) => {
    if (!commentId) {
      return;
    }

    await updateTableRowById("comment", { deleted: true }, commentId);
    queryClient.invalidateQueries({
      queryKey: ["comment", articleId],
      exact: true,
    });
  };
  return { postComment, updateComment, deleteComment };
};
