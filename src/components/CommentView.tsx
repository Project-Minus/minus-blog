import { Comment } from "@/type/tableType";

import "@/styles/commentView.scss";
import dayjs from "dayjs";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useModifyComment } from "@/hooks/useModifyComment";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  articleId: string;
  comment: Comment;
  changeUpdateMode: (id: string) => void;
}

export default function CommentView({
  articleId,
  comment,
  changeUpdateMode,
}: Props) {
  const {
    id,
    depth,
    name,
    icon,
    isSecret,
    secretKey,
    content,
    deleted,
    created_at: createdAt,
  } = comment;
  const queryClient = useQueryClient();
  const { deleteComment } = useModifyComment();
  const [confirmKey, setConfirmKey] = useState<string>("");
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const masterKey = process.env.NEXT_PUBLIC_COMMENT_MASTER_KEY;
  const createdAtTime = dayjs(createdAt).format("YYYY.MM.DD HH:mm");

  const displayContent = (): { content: string; className: string } => {
    if (deleted) {
      return {
        content: "삭제된 댓글입니다.",
        className: " deleted",
      };
    }
    if (isSecret) {
      if (!isConfirmed) {
        return {
          content: "관리자만 볼 수 있는 댓글입니다.",
          className: " secret",
        };
      }
    }
    return { content, className: "" };
  };
  const getViewWidth = () => {
    const widthWithDepth = depth * 30;
    return { width: `calc(100% - ${widthWithDepth}px)` };
  };

  const changeConfirmKey = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmKey(value);
  };

  const changeConfirmed = () => {
    if (confirmKey === secretKey || confirmKey === masterKey) {
      setIsConfirmed(true);
      return;
    }
    setIsConfirmed(false);
    alert("올바르지 않은 확인 번호입니다");
  };

  const clickDeleteComment = async () => {
    await deleteComment(articleId, id, queryClient);
  };
  return (
    <div className="comment_view" style={{ ...getViewWidth() }}>
      <div className="profile_wrapper">
        <div className="profile_box">
          <div suppressHydrationWarning className="profile_emoji">
            {icon}
          </div>
        </div>
        <div className="content_wrapper">
          <div className="content_fields">
            <div className="content_name">{name}</div>
            {isConfirmed && !deleted && (
              <div className="content_modify">
                <div
                  onClick={() => {
                    changeUpdateMode(id);
                  }}
                >
                  수정하기
                </div>
                <div onClick={clickDeleteComment}>삭제하기</div>
              </div>
            )}
            {!isConfirmed && !deleted && (
              <div className="content_confirm">
                <input
                  type="text"
                  placeholder="번호 인증"
                  onChange={changeConfirmKey}
                  onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") {
                      changeConfirmed();
                    }
                  }}
                />
                <button type="button" onClick={changeConfirmed}>
                  인증
                </button>
              </div>
            )}
          </div>
          <div className={`content_text${displayContent().className}`}>
            {displayContent().content}
          </div>
          <div className="content_underline">
            <div className="content_time">{createdAtTime}</div>
            <div className="content_reply">답글쓰기</div>
          </div>
        </div>
      </div>
    </div>
  );
}
