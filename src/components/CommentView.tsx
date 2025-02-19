import { Comment } from "@/type/tableType";

interface Props {
  comment: Comment;
}

export default function CommentView({ comment }: Props) {
  console.log(comment);
  return (
    <div>
      <span />
    </div>
  );
}
