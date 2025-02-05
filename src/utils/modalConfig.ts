export const getModalConfig = (
  type: "confirm" | "warning" | "error",
  title: string,
) => {
  const types = type.substring(0, 1).toUpperCase() + type.substring(1);
  const buttons = type !== "confirm";
  const modalTitle = title || types;

  return { title: modalTitle, buttons };
};
