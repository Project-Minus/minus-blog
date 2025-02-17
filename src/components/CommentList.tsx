import { useGetCommentByArticleId } from "@/api/useGetTable";
import { sortComment } from "@/utils/sortComment";

interface Props {
  articleId: string;
}

export default function CommentList({ articleId }: Props) {
  const { data } = useGetCommentByArticleId(articleId);

  const sortedData = sortComment(data);
  console.log(sortedData);
  return (
    <div>
      <span />
    </div>
  );
}
