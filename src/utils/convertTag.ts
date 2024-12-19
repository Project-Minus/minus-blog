export const convertPContent = (content: string) => {
  const convertContent = content
    .replaceAll("<p>", "<div>")
    .replaceAll("</p>", "</div>");
  return convertContent;
};
