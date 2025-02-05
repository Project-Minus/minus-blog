import { IFRAME_TYPE } from "@/constants/iframeConstants";
import Spinner from "@/widgets/Spinner";
import { useRef, useState } from "react";

export default function IframeWithLoading({
  src,
  title,
  iframeType,
}: {
  src: string;
  title: string;
  iframeType: string;
}) {
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isIframeInDocs = iframeType === IFRAME_TYPE.inDocs;
  return (
    <div
      style={{
        position: "relative",
        height: "650px",
      }}
    >
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Spinner size="large" />
        </div>
      )}
      <iframe
        ref={iframeRef}
        style={{
          position: "relative",
          width: "1200px",
          height: "100%",
          transform: isIframeInDocs ? "translateX(-250px)" : "translateX(0px)",
          opacity: loading ? 0 : 1, // ✅ 로딩 중이면 투명하게 처리
          transition: "opacity 0.3s ease-in-out",
        }}
        onLoad={() => {
          setLoading(false);
        }}
        src={src}
        title={title}
      />
    </div>
  );
}
