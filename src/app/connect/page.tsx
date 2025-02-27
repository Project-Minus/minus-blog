import "../../styles/others.scss";
import { headerFont } from "../page";

export default function Connect() {
  return (
    <div className="other_page">
      <div className={`${headerFont.className} title`}>Connect</div>
      <p>연락 및 소통은 언제나 환영합니다!</p>

      <h2>📩 Email</h2>
      <p>
        <a href="mailto:park970320@gmail.com">park970320@gmail.com</a>
      </p>

      <h2>💻 GitHub</h2>
      <p>
        <a
          href="https://github.com/kyle970320"
          target="_blank"
          rel="noopener noreferrer"
        >
          👉 깃허브
        </a>
      </p>

      <h2>📦 Minus-UI (라이브러리)</h2>
      <ul>
        <li>
          GitHub:{" "}
          <a
            href="https://github.com/Project-Minus/minus-ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            👉 라이브러리 깃허브
          </a>
        </li>
        <li>
          NPM:{" "}
          <a
            href="https://www.npmjs.com/package/@minus-ui/core"
            target="_blank"
            rel="noopener noreferrer"
          >
            👉 라이브러리 npmjs
          </a>
        </li>
      </ul>

      <h2>📖 Notion</h2>
      <p>
        <a
          href="https://rounded-grey-2bb.notion.site/10b96c701dfa8086ae95c3ab31fc31eb?pvs=74"
          target="_blank"
          rel="noopener noreferrer"
        >
          👉개인 노션 페이지
        </a>
      </p>

      <p style={{ marginTop: 40 }}>
        궁금한 점이 있거나 협업, 피드백이 필요하시면 언제든지 편하게 연락
        주세요! 😊
      </p>
    </div>
  );
}
