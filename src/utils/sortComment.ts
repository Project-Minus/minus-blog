import { Comment } from "@/type/tableType";

export const sortComment = (commentData: Array<Comment>) => {
  // depth가 0인 요소들을 먼저 찾음
  const rootNodes = commentData.filter((item) => item.depth === 0);
  const sortedData: Array<Comment> = [];

  // 각 depth가 0인 노드를 기준으로 자식들을 붙여가며 정렬
  const addChildren = (parent: Comment) => {
    sortedData.push(parent); // 부모를 추가
    // 현재 부모를 parentId로 갖는 자식들을 찾아서 추가
    const children = commentData.filter((item) => item.parentId === parent.id);
    children.forEach((child) => addChildren(child));
  };

  // depth 0인 각 노드에 대해 자식들을 추가
  rootNodes.forEach((root) => addChildren(root));

  return sortedData;
};
