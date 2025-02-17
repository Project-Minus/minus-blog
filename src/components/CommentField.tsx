import "@/styles/commentField.scss";
import { getRandomEmoji } from "@/utils/getRandomEmoji";
import { ChangeEvent, useState } from "react";
import {
  AiOutlineLock,
  AiOutlineUnlock,
  AiOutlineUpload,
} from "react-icons/ai";
import { usePathname } from "next/navigation";
import { postTableRow } from "@/api/init";
import { produce } from "immer";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  articleId: string;
  depth?: number;
  parentId?: string;
}
const randomEmoji = getRandomEmoji();

export default function CommnetField(props: Props) {
  const { articleId, depth = 0, parentId = "" } = props;
  const queryClient = useQueryClient();
  const location = usePathname();
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({
    name: "",
    secretKey: "",
  });

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

  const handleSubmitComment = async () => {
    const newComment = {
      articleId,
      depth,
      parentId,
      icon: randomEmoji,
      isSecret,
      name: inputValues.name,
      secretKey: inputValues,
    };
    await postTableRow("comment", newComment);
    queryClient.invalidateQueries({
      queryKey: ["comment", articleId],
      exact: true,
    });
  };

  return (
    <div className="comment_field">
      <div>
        <span>댓글 0개</span>
        <button
          type="button"
          onClick={() => {
            copyToClipboard();
          }}
        >
          <AiOutlineUpload />
        </button>
      </div>
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
              placeholder="닉네임"
              onChange={changeInputValues}
            />
            <input
              name="secretKey"
              type="text"
              placeholder="비밀번호"
              onChange={changeInputValues}
            />
          </div>
          <textarea rows={5} />
        </div>
      </div>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsSecret((prev) => !prev);
          }}
        >
          {isSecret ? <AiOutlineLock /> : <AiOutlineUnlock />}
        </button>
        <button type="button" onClick={handleSubmitComment}>
          제출
        </button>
      </div>
    </div>
  );
}
