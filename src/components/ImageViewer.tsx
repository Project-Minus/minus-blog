"use client";

import { createPortal } from "react-dom";
import "../styles/imageViewer.scss";
import Image from "next/image";
import { createRoot, Root } from "react-dom/client";
import { ImageViewerConfig } from "@/type/imageViewer";
import {
  CgArrowsVAlt,
  CgArrowsHAlt,
  CgCornerUpLeft,
  CgCornerUpRight,
} from "react-icons/cg";
import { LuZoomIn, LuZoomOut } from "react-icons/lu";
import { useState } from "react";

interface Props {
  url: string;
  closeViewer: () => void;
}

export default function ImageViewer({ url, closeViewer }: Props) {
  const handleCloseViewer = () => {
    closeViewer();
  };

  const [imageRotate, setImageRotate] = useState<string>("rotate(0deg)");
  const [rotateLeftAndRight, setRotateLeftAndRight] = useState<number>(0);
  // const setOriginRotateZ = (rotateNum: number) => {
  //   const rorateNumSign = rotateNum > 0 ? 1 : -1;
  //   for (let i = 0; i <= Math.abs(rotateNum) / 4; i++) {
  //     if ((i + 1) * 4) {
  //       return;
  //     }
  //   }
  // };
  const handleControlImage = (imageRotateValue: string) => {
    if (
      imageRotateValue.startsWith("rotateX") ||
      imageRotateValue.startsWith("rotateY")
    ) {
      setRotateLeftAndRight(0);
      if (imageRotate === imageRotateValue) {
        setImageRotate("rotate(0deg)");
        return;
      }
      if (imageRotate === "rotate(0deg)") {
        setImageRotate(imageRotateValue);
        return;
      }
      setImageRotate("");
      setTimeout(() => {
        setImageRotate(imageRotateValue);
      }, 500);
    }

    if (imageRotateValue.startsWith("rotateZ")) {
      if (
        imageRotate.startsWith("rotateX") ||
        imageRotate.startsWith("rotateY")
      ) {
        setImageRotate("");
        setTimeout(() => {
          setImageRotate(imageRotateValue);
        }, 500);
        return;
      }
      setImageRotate(imageRotateValue);
    }
  };
  console.log(rotateLeftAndRight);
  return createPortal(
    <div className="imageViewerWrapper" onClick={handleCloseViewer}>
      <div className="viewerPort">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="viewerContent"
          style={{ transform: imageRotate }}
        >
          <Image src={url} alt="" fill style={{ objectFit: "contain" }} />
        </div>
      </div>
      <div
        className="viewerButtons"
        key={url}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CgArrowsVAlt
          className="icon"
          onClick={() => {
            handleControlImage("rotateX(180deg)");
          }}
        />
        <CgArrowsHAlt
          className="icon"
          onClick={() => {
            handleControlImage("rotateY(180deg)");
          }}
        />
        <CgCornerUpLeft
          onClick={() => {
            const newRotateCount = rotateLeftAndRight - 1;
            setRotateLeftAndRight(newRotateCount);
            handleControlImage(`rotateZ(${newRotateCount * 90}deg)`);
          }}
          className="icon"
        />
        <CgCornerUpRight
          onClick={() => {
            const newRotateCount = rotateLeftAndRight + 1;
            setRotateLeftAndRight(newRotateCount);
            handleControlImage(`rotateZ(${newRotateCount * 90}deg)`);
          }}
          className="icon"
        />
        <LuZoomIn className="icon" />
        <LuZoomOut className="icon" />
      </div>
    </div>,
    document.getElementById("image-viewer-root") as HTMLElement,
  );
}

let imageViewerRoot: Root | null = null;

const getImageViewerRoot = () => {
  const container = document.getElementById("modal-root");
  if (!container) {
    throw new Error("Modal root container not found");
  }

  // 기존 root가 있으면 반환
  if (imageViewerRoot) {
    return imageViewerRoot;
  }

  // 없으면 새 root 생성
  imageViewerRoot = createRoot(container);
  return imageViewerRoot;
};

const closeViewer = () => {
  if (imageViewerRoot) {
    imageViewerRoot.unmount();
    imageViewerRoot = null;
  }
};

ImageViewer.open = (config: ImageViewerConfig) => {
  const { url } = config;
  const imageRoot = getImageViewerRoot();

  imageRoot.render(<ImageViewer url={url} closeViewer={closeViewer} />);
};
