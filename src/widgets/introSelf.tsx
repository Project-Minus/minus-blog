import Image from "next/image";
import { usePathname } from "next/navigation";
import { AiOutlineUpload } from "react-icons/ai";
import myslef from "../../public/kyle_git.jpg";
import "@/styles/introSelf.scss";

export default function IntroSelf() {
  const location = usePathname();
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
  return (
    <div className="intro_self">
      <Image src={myslef} alt="" />
      <p>
        Minus, <br />
        코드를 간결하게
        <button
          className="copy_button"
          type="button"
          onClick={() => {
            copyToClipboard();
          }}
          style={{ width: 90 }}
        >
          글 공유하기 <AiOutlineUpload />
        </button>
      </p>
    </div>
  );
}
