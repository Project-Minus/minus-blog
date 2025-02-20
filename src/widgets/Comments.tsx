import { useGetCommentByArticleId } from "@/api/useGetTable";
import CommnetField from "@/components/CommentField";
import CommentList from "@/components/CommentList";

interface Props {
  articleId: string;
}
export default function Comments({ articleId }: Props) {
  const { data } = useGetCommentByArticleId(articleId);
  return (
    <div>
      <CommnetField articleId={articleId} totalComments={data?.length} />
      <CommentList articleId={articleId} data={data} />
    </div>
  );
}
