// import Image from "next/image";
import MainList from "@/widgets/MainList";
import FloatingAside from "@/widgets/FloatingAside";
import { Aldrich } from "next/font/google";
import ListTitle from "@/components/ListTitle";
import FavoriteList from "@/components/FavoriteList";
import styles from "./page.module.css";
import Slider from "../components/Slider";
import TypingModal from "../components/TypingModal";

const headerFont = Aldrich({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const message = "Make the code concise";

  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>
        <h1 className={headerFont.className}>{message}</h1>
        <TypingModal />
        <Slider />
      </div>
      <div>
        <ListTitle text="Favorites" />
        <FavoriteList />
      </div>
      <main className={styles.main}>
        <FloatingAside />
        <MainList />
      </main>
    </div>
  );
}
