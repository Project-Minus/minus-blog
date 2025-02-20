import "@/styles/commentField.scss";
import { getRandomEmoji } from "@/utils/getRandomEmoji";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineUpload,
} from "react-icons/ai";
import { usePathname } from "next/navigation";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";
import { Comment } from "@/type/tableType";
import { useModifyComment } from "@/hooks/useModifyComment";

interface Props {
  articleId: string;
  depth?: number;
  parentId?: string;
  comment?: Comment;
  changeUpdateMode?: (id: string) => void;
}

export default function CommnetField(props: Props) {
  const {
    articleId,
    depth = 0,
    parentId = "",
    comment,
    changeUpdateMode = () => {},
  } = props;
  const queryClient = useQueryClient();
  const location = usePathname();
  const { postComment, updateComment } = useModifyComment();
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>("");
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    name: "",
    secretKey: "",
  });
  const randomEmoji = useMemo(() => {
    return getRandomEmoji();
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `https://d3jed8cbqldvwv.cloudfront.net${location}`,
      );
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("다시 시도해주세요");
    }
  };

  const getInputWrapperWidth = () => {
    const widthWithDepth = depth * 30;
    return { width: `calc(100% - ${widthWithDepth + 70}px)` };
  };

  const changeInputValues = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValues(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  };

  const changeContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentContent(value);
  };

  const handleSubmitComment = async () => {
    if (!inputValues.name) {
      alert("닉네임을 입력해주세요!");
      return;
    }
    if (!inputValues.secretKey) {
      alert("확인 번호를 입력해주세요!");
      return;
    }
    if (!commentContent) {
      alert("댓글 내용을 입력해주세요!");
      return;
    }

    const newComment: Partial<Comment> = {
      articleId,
      depth,
      parentId,
      isSecret,
      icon: randomEmoji,
      name: inputValues.name,
      secretKey: inputValues.secretKey,
      content: commentContent,
    };
    if (comment) {
      await updateComment({ ...newComment, id: comment.id }, queryClient);
      changeUpdateMode("");
      return;
    }
    await postComment(newComment, queryClient);

    setInputValues({
      name: "",
      secretKey: "",
    });
    setCommentContent("");
  };

  useEffect(() => {
    if (comment) {
      const { name, secretKey, content } = comment;
      setInputValues({
        name,
        secretKey,
      });
      setCommentContent(content);
    }
  }, [comment]);
  return (
    <div className="comment_field">
      {!comment && (
        <div className="comment_upper">
          <span>댓글 0개</span>
          <button
            className="comment_button"
            type="button"
            onClick={() => {
              copyToClipboard();
            }}
            style={{ width: 120 }}
          >
            글 공유하기 <AiOutlineUpload />
          </button>
        </div>
      )}
      <div className="profile_wrapper">
        <div className="profile_box">
          <div suppressHydrationWarning className="profile_emoji">
            {randomEmoji}
          </div>
        </div>
        <div
          className="input_wrapper"
          style={{
            ...getInputWrapperWidth(),
          }}
        >
          <div className="input_fields">
            <input
              name="name"
              type="text"
              placeholder="닉네임(최대 8자)"
              value={inputValues.name}
              onChange={changeInputValues}
              maxLength={8}
            />
            <input
              name="secretKey"
              type="text"
              placeholder="확인 번호(최대 8자 / 수정, 삭제시 필수)"
              value={inputValues.secretKey}
              onChange={changeInputValues}
              maxLength={8}
            />
          </div>
          <textarea
            rows={5}
            placeholder="최대 200자"
            value={commentContent}
            onChange={changeContent}
            maxLength={200}
          />
        </div>
      </div>
      <div className="comment_lower">
        <button
          className={`lock_button${isSecret ? "" : " locked"}`}
          type="button"
          onClick={() => {
            setIsSecret((prev) => !prev);
          }}
        >
          {isSecret ? <AiOutlineLock /> : <AiOutlineUnlock />}
        </button>
        <button
          className="comment_button"
          type="button"
          onClick={handleSubmitComment}
          style={{ fontSize: 16 }}
        >
          제출
        </button>
      </div>
    </div>
  );
}
