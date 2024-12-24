import { getAllTable } from "@/api/init";

import { Article } from "@/type/tableType";
import ArticleDetail from "../widgets/ArticleDetail";

interface Props {
  params: Promise<{ id: string }>;
}
export async function generateStaticParams() {
  const posts = (await getAllTable("article").then(
    (res) => res.data,
  )) as Array<Article>;

  return posts.map((post) => ({
    id: String(post.id), // 문자열로 변환
  }));
}

export default async function Category({ params }: Props) {
  const { id } = await params;
  return <ArticleDetail articleId={id} />;
}
