import { AiOutlineClose } from "react-icons/ai";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { createRoot, Root } from "react-dom/client";
import { ModalConfig } from "@/type/modal";
import ModalWrapper from "@/components/ModalWrapper";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { convertPContent } from "@/utils/convertTag";
import "@/styles/modal.scss";
import IframeWithLoading from "@/app/category/components/IframeWithLoading";
import { IFRAME_TYPE } from "@/constants/iframeConstants";

interface Props {
  title: string;
  onClickOk?: () => void;
  onClickClose?: () => void;
  onMount?: () => void;
  onUnMount?: () => void;
  open: boolean;
  background?: boolean;
  disableBackgroundInteract?: boolean; // modal 열린 상태에서도 다른 상호작용 가능 여부
  children?: ReactNode;
  isOneButton?: boolean;
  oneButtonTitle?: "Close" | "OK";
  hasClose?: boolean;
  hasDepth?: boolean;
  position?: "center" | "mapBottom";
  size?: "small" | "mid" | "large" | "dynamic";
  isBreakWord?: boolean;
  iframeData?: string;
}

export default function Modal(props: Props) {
  const {
    title,
    onClickOk,
    onClickClose,
    onMount,
    onUnMount,
    open,
    background = false,
    disableBackgroundInteract = false,
    children,
    isOneButton = false,
    oneButtonTitle = "Close",
    hasClose = false,
    hasDepth = false,
    position = "center",
    size = "small",
    isBreakWord = false,
    iframeData = "",
  } = props;

  const breakWordClass = isBreakWord ? "--break" : "";
  const isIframeContent = !!iframeData;

  useEffect(() => {
    // 모달이 open, close 시 스크롤 방지 등의 로직 추가
    if (onMount && open) {
      onMount();
    }
    return () => {
      // 모달이 닫힐 때 원상태로 복구하는 로직 추가
      if (onUnMount) {
        onUnMount();
      }
    };
  }, [onMount, onUnMount, open]);

  const iframeConverter: HTMLReactParserOptions["replace"] = (domNode) => {
    if (domNode.type === "tag" && domNode.name === "iframe") {
      const { src, title: articleTitle } = domNode.attribs;

      return (
        <IframeWithLoading
          src={src}
          title={articleTitle}
          iframeType={IFRAME_TYPE.modal}
        />
      );
    }
    return <></>;
  };

  const getFontSize = () => {
    switch (size) {
      case "small":
        return 20;
      case "mid":
        return 24;
      case "large":
        return 24;
      case "dynamic":
        return 24;
      default:
        return 20;
    }
  };

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className={`common-modal__wrapper${disableBackgroundInteract ? "--hide" : ""}`}
    >
      <div
        className={`common-modal common-modal--${size} common-modal--${position}`}
      >
        {hasDepth && <div className="common-modal__depth-blocker" />}
        <div className="common-modal__title">
          <div
            style={{
              fontSize: getFontSize(),
              fontWeight: 700,
            }}
          >
            {title}
          </div>
          {hasClose ? (
            <AiOutlineClose width={20} height={20} onClick={onClickClose} />
          ) : null}
        </div>
        <div className={`common-modal__content${breakWordClass} ${position}`}>
          {isIframeContent &&
            parse(convertPContent(iframeData), {
              replace: iframeConverter,
            })}
          {!isIframeContent && children}
        </div>
        <div className="common-modal__buttons">
          {isOneButton ? (
            <button
              type="button"
              onClick={oneButtonTitle === "OK" ? onClickOk : onClickClose}
            >
              {oneButtonTitle}
            </button>
          ) : (
            <>
              <button type="button" onClick={onClickOk}>
                OK
              </button>
              <button type="button" onClick={onClickClose}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className={`common-modal--background${!background ? "--hide" : ""}`}
      />
      <div
        className={disableBackgroundInteract ? "common-modal__lock-side" : ""}
      />
    </div>,
    document.getElementById("modal-root") as HTMLElement, // 'modal-root'에 모달 렌더링
  );
}

let modalRoot: Root | null = null;

const getModalRoot = () => {
  const container = document.getElementById("modal-root");

  if (!container) {
    throw new Error("Modal root container not found");
  }

  // 기존 root가 있으면 반환
  if (modalRoot) {
    return modalRoot;
  }

  // 없으면 새 root 생성
  modalRoot = createRoot(container);
  return modalRoot;
};

const closeModal = () => {
  if (modalRoot) {
    modalRoot.unmount();
    modalRoot = null;
  }
};

Modal.confirm = (config: ModalConfig) => {
  const confirmModalRoot = getModalRoot();

  confirmModalRoot.render(
    <ModalWrapper closeModal={closeModal} type="confirm" {...config} />,
  );
};

Modal.warning = (config: ModalConfig) => {
  const warningModalRoot = getModalRoot();

  warningModalRoot.render(
    <ModalWrapper closeModal={closeModal} type="warning" {...config} />,
  );
};

Modal.error = (config: ModalConfig) => {
  const errorModalRoot = getModalRoot();

  errorModalRoot.render(
    <ModalWrapper closeModal={closeModal} type="error" {...config} />,
  );
};
