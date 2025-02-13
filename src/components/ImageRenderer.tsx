import Image from "next/image";
import ImageViewer from "./ImageViewer";
import "../styles/imgaeRenderer.scss";

interface Props {
  src: string;
}
export default function ImageRenderer({ src }: Props) {
  return (
    <div
      className="image_renderer"
      onClick={() => {
        ImageViewer.open({ url: src });
      }}
    >
      <Image
        layout="intrinsic"
        src={src}
        width={500}
        height={100}
        style={{ objectFit: "contain" }}
        alt=""
      />
    </div>
  );
}
