export interface ModalConfig {
  title?: string;
  content?: string | React.ReactNode;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void | Promise<void>;
  background?: boolean;
  disableBackgroundInteract?: boolean;
  hasClose?: boolean;
  hasTitleDivider?: boolean;
  hasDepth?: boolean;
  position?: "center" | "mapBottom";
  size?: "small" | "mid" | "large";
  buttonTitle?: "Close" | "OK";
  isBreakWord?: boolean;
}
