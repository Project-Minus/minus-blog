import "@/styles/category.scss";

interface Props {
  hasIframe: boolean;
}
export default function IframeInfo({ hasIframe = false }: Props) {
  if (!hasIframe) {
    return null;
  }
  return (
    <div className="iframeInfo">
      ※ 해당 페이지는 Component Story가 포함되어 있습니다.
      <br />
      전체화면으로 보시기를 권장 드립니다.
      <br />
      또한 우측 하단의 Dial을 사용하실 수있습니다.
      <br />
      popup, modal 에서 Full Docs를 확인하실 수 있습니다.
    </div>
  );
}
