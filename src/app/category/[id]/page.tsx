"use client";

import { useGetTableById } from "@/api/useGetTable";
import { Article } from "@/type/tableType";
import { useParams } from "next/navigation";

export default function Category() {
  const params = useParams();
  const { data } = useGetTableById<Article>("article", params.id as string);
  const currentData = data ? data[0] : ({} as Article);

  return (
    <div>
      <div>{currentData?.title}</div>
      <span>{currentData?.description}</span>
    </div>
  );
}
