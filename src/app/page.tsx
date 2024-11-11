// import Image from "next/image";
import ArticleList from "@/widgets/ArticleList";
import FloatingAside from "@/widgets/FloatingAside";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FloatingAside />
        <ArticleList />
      </main>
    </div>
  );
}
