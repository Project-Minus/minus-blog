"use client";

import { ModalConfig } from "@/type/modal";
import { useCallback, useEffect, useRef } from "react";
import { getModalConfig } from "@/utils/modalConfig";
import Modal from "@/components/Modal";

interface Props extends ModalConfig {
  closeModal: () => void;
  type: "confirm" | "warning" | "error";
}
export default function ModalWrapper(props: Props) {
  const {
    type,
    title,
    content,
    size = "small",
    position = "center",
    closeModal,
    onOk,
    onCancel,
    background = true,
    disableBackgroundInteract = false,
    hasClose = true,
    hasDepth = false,
    buttonTitle = "OK",
    isBreakWord = false,
  } = props;

  const modalConfig = getModalConfig(type, title ?? "");
  const isScroll =
    typeof window !== "undefined"
      ? window.innerHeight !== document.body.scrollHeight
      : false;
  const scrollRef = useRef<number>(0);
  const lockScroll = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const { scrollY } = window;
    const scorllValue = scrollY || scrollRef.current;

    document.body.style.cssText = `
        position:fixed;
        top: ${`-${scorllValue}px`};
        overflow-y: ${isScroll ? "scroll" : "auto"};
        width: 100%;
        `;
  }, [isScroll]);

  // 모달이 닫혔을 때 스크롤을 활성화 한다.
  const openScroll = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }
    const topPosition = parseInt(document.body.style.top || "0", 10) * -1;
    const { scrollY } = window;
    const scroll = topPosition || scrollY;

    document.body.style.cssText = "";

    window.scrollTo(0, parseInt(String(scroll) || "0", 10) * 1);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    scrollRef.current = window.scrollY;
  }, []);

  const clickClose = () => {
    if (onCancel) {
      const result = onCancel();

      if (result instanceof Promise) {
        result.catch((error) => console.error("Error in onCancel:", error));
      }
    }
    closeModal();
  };

  const clickOk = () => {
    if (onOk) {
      const result = onOk();

      if (result instanceof Promise) {
        result.catch((error) => console.error("Error in onCancel:", error));
      }
    }

    closeModal();
  };

  // 뒤로가기, 앞으로가기 시에 Modal Unmount
  useEffect(() => {
    const handleUnmountOnAddressChange = () => {
      closeModal();
    };
    if (typeof window === "undefined") {
      return;
    }
    window.addEventListener("popstate", handleUnmountOnAddressChange);
    return () => {
      if (typeof window === "undefined") {
        return;
      }
      window.removeEventListener("popstate", handleUnmountOnAddressChange);
    };
  }, [closeModal]);

  return (
    <Modal
      title={modalConfig.title}
      size={size}
      open
      position={position}
      background={background}
      disableBackgroundInteract={disableBackgroundInteract}
      hasDepth={hasDepth}
      hasClose={hasClose}
      isOneButton={modalConfig.buttons}
      oneButtonTitle={buttonTitle}
      onClickOk={clickOk}
      onClickClose={clickClose}
      onMount={lockScroll}
      onUnMount={openScroll}
      isBreakWord={isBreakWord}
    >
      {content}
    </Modal>
  );
}
