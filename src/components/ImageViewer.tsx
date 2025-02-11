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
import { useEffect, useState } from "react";
import { produce } from "immer";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import { getZoomBlockStyle } from "@/utils/imageControll";

interface Props {
  url: string;
  closeViewer: () => void;
}

type Axis = "X" | "Y" | "Z";
export default function ImageViewer({ url, closeViewer }: Props) {
  const { openScroll, lockScroll } = useBodyScrollLock();
  const [zoomBlock, setZoomBlock] = useState<{
    zoomIn: boolean;
    zoomOut: boolean;
  }>({ zoomIn: false, zoomOut: false });
  const [isMouseHold, setIsMouseHold] = useState<boolean>(false);
  const [rotateLeftAndRight, setRotateLeftAndRight] = useState<number>(0);
  const [imageStartPoint, setImageStartPoint] = useState<Record<Axis, number>>({
    X: 1,
    Y: 1,
    Z: 1,
  });
  const [imageScale, setImageScale] = useState<Record<Axis, number>>({
    X: 1,
    Y: 1,
    Z: 1,
  });
  const [imageTranslate, setImageTranslate] = useState<Record<Axis, number>>({
    X: 0,
    Y: 0,
    Z: 0,
  });

  const handleImageScale = (
    type: "flip" | "scale",
    rotateKey: Axis,
    rotateValue: number,
  ) => {
    if (type === "flip") {
      setImageScale(
        produce((draft) => {
          draft[rotateKey] = imageScale[rotateKey] * -1;
        }),
      );
      return;
    }
    setImageScale(
      produce((draft) => {
        draft[rotateKey] = rotateValue;
      }),
    );
  };
  const handleImageStartPoint = (startKey: Axis, startValue: number) => {
    setImageStartPoint(
      produce((draft) => {
        draft[startKey] = startValue;
      }),
    );
  };
  const handleImageTranslate = (translateKey: Axis, translateValue: number) => {
    setImageTranslate(
      produce((draft) => {
        draft[translateKey] = translateValue;
      }),
    );
  };

  useEffect(() => {
    lockScroll();

    return () => {
      openScroll();
    };
  }, [lockScroll, openScroll]);

  useEffect(() => {
    if (isMouseHold) {
      const handlePointerMove = (e: PointerEvent) => {
        requestAnimationFrame(() => {
          const deltaX = e.clientX - imageStartPoint.X;
          const deltaY = e.clientY - imageStartPoint.Y;

          // deltaX = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, deltaX));
          // deltaY = Math.max(-MAX_SPEED, Math.min(MAX_SPEED, deltaY));

          handleImageTranslate("X", imageTranslate.X + deltaX);
          handleImageTranslate("Y", imageTranslate.Y + deltaY);

          handleImageStartPoint("X", e.clientX);
          handleImageStartPoint("Y", e.clientY);
        });
      };

      const handlePointerUp = () => {
        setIsMouseHold(false);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };

      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
    }
  }, [isMouseHold, imageStartPoint, imageTranslate]);

  return createPortal(
    <div
      className="imageViewerWrapper"
      onMouseDown={closeViewer}
      style={{ cursor: isMouseHold ? "grabbing" : "default" }}
    >
      <div className="viewerPort">
        <div
          onMouseDown={(e) => {
            e.stopPropagation();
          }}
          className="viewerContent"
          style={{
            transform: `rotateZ(${rotateLeftAndRight * 90}deg) scale3d(${imageScale.X},${imageScale.Y},${imageScale.Z}) translate3d(${imageTranslate.X}px,${imageTranslate.Y}px,${imageTranslate.Z}px)`,
          }}
        >
          <Image
            src={url}
            alt=""
            draggable={false}
            fill
            style={{
              objectFit: "contain",
              cursor: isMouseHold ? "grabbing" : "grab",
            }}
            onMouseDown={(e) => {
              handleImageStartPoint("X", e.clientX);
              handleImageStartPoint("Y", e.clientY);
              setIsMouseHold(true);
            }}
            onMouseUp={() => {
              setIsMouseHold(false);
            }}
            onMouseMove={() => {
              if (!isMouseHold) {
                return;
              }
            }}
          />
        </div>
      </div>
      <div
        className="viewerButtons"
        key={url}
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
      >
        <CgArrowsVAlt
          className="icon"
          onClick={() => {
            handleImageScale("flip", "Y", 180);
          }}
        />
        <CgArrowsHAlt
          className="icon"
          onClick={() => {
            handleImageScale("flip", "X", 180);
          }}
        />
        <CgCornerUpLeft
          onClick={() => {
            const newRotateCount = rotateLeftAndRight - 1;
            setRotateLeftAndRight(newRotateCount);
          }}
          className="icon"
        />
        <CgCornerUpRight
          onClick={() => {
            const newRotateCount = rotateLeftAndRight + 1;
            setRotateLeftAndRight(newRotateCount);
          }}
          className="icon"
        />
        <LuZoomIn
          className="icon"
          onClick={() => {
            if (zoomBlock.zoomIn) {
              return;
            }
            const newZoomX = imageScale.X * 1.5;
            const newZoomY = imageScale.Y * 1.5;
            if (newZoomX > 2) {
              setZoomBlock(
                produce((draft) => {
                  draft.zoomIn = true;
                }),
              );
            }
            handleImageScale("scale", "X", newZoomX);
            handleImageScale("scale", "Y", newZoomY);
          }}
          style={{ ...getZoomBlockStyle(zoomBlock.zoomIn) }}
        />
        <LuZoomOut
          className="icon"
          onClick={() => {
            if (zoomBlock.zoomOut) {
              return;
            }
            const newZoomX = imageScale.X / 1.5;
            const newZoomY = imageScale.Y / 1.5;
            if (newZoomX < 0.5) {
              setZoomBlock(
                produce((draft) => {
                  draft.zoomOut = true;
                }),
              );
            }
            handleImageScale("scale", "X", newZoomX);
            handleImageScale("scale", "Y", newZoomY);
          }}
          style={{ ...getZoomBlockStyle(zoomBlock.zoomOut) }}
        />
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
