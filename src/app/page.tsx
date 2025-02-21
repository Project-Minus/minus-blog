// import Image from "next/image";
import MainList from "@/widgets/MainList";
import FloatingAside from "@/widgets/FloatingAside";
import { Aldrich } from "next/font/google";
import FavoriteList from "@/components/FavoriteList";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllTable } from "@/api/init";
import styles from "./page.module.css";
import Slider from "../components/Slider";
import TypingModal from "../components/TypingModal";

const headerFont = Aldrich({ subsets: ["latin"], weight: ["400"] });

export default async function Home() {
  const message = "Make the code concise";

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["articleTable"],
    queryFn: () => getAllTable("article").catch(console.error),
    staleTime: 5 * 60 * 1000, // 바로 stale 상태로 변경되는 것을 방지하기 위해 5분으으로 설정
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className={styles.page}>
        <div className={styles.pageTitle}>
          <h1 className={`${headerFont.className} ${styles.titleMessage}`}>
            {message}
          </h1>
          <TypingModal />
          <Slider />
        </div>
        <FavoriteList />
        <main className={styles.main}>
          <FloatingAside />
          <MainList />
        </main>
      </div>
    </HydrationBoundary>
  );
}
