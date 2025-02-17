import "@/styles/commentField.scss";
import { getRandomEmoji } from "@/utils/getRandomEmoji";
import { useState } from "react";

const randomEmoji = getRandomEmoji();
export default function CommnetField() {
  const [profileEmoji, setProfileEmoji] = useState<string>(randomEmoji);
  const [isSecret, setIsSecret] = useState<boolean>(false);
  console.log(isSecret, setIsSecret, setProfileEmoji);
  return (
    <div className="comment_field">
      <div className="profile_wrapper">
        <div className="profile_box">
          <div suppressHydrationWarning className="profile_emoji">
            {profileEmoji}
          </div>
        </div>
        <div className="input_wrapper">
          <div className="input_fields">
            <input type="text" placeholder="닉네임" />
            <input type="text" placeholder="비밀번호" />
          </div>
          <textarea rows={5} />
        </div>
      </div>
      <div>
        <button type="button">12</button>
        <button type="button">제출</button>
      </div>
      <div className="comment_divider">댓글 0,</div>
    </div>
  );
}
