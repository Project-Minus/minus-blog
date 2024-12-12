"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server일 경우 QueryClient 매번 재 생성
    return makeQueryClient();
  }
  // Browser일 경우 QueryClient 유무 확인 후 없을 시 생성
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export default function Providers({ children }: PropsWithChildren) {
  // NOTE: queryClient를 useState를 사용하여 초기화 하면 안된다.
  // suspense boundary가 없을 경우 React의 렌더링이 중단될 수도 있고
  // queryClient 자체를 폐기할 수 도 있다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
