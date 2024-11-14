// import Image from "next/image";
import MainList from "@/widgets/MainList";
import FloatingAside from "@/widgets/FloatingAside";
import styles from "./page.module.css";
import Slider from "../components/Slider";

export default function Home() {
  const message = '"Make the code concise"';
  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>
        <h1>{message}</h1>
        <h2>
          welcome to Minus!
          <br />
          We develop using React and TypeScript.
          <br />
          We enjoy adopting new technologies and strive for continuous
          improvement.
          <br />
          Welcome! We hope you enjoy your time reading our posts.
        </h2>
        <Slider />
      </div>
      <main className={styles.main}>
        <FloatingAside />
        <MainList />
      </main>
    </div>
  );
}
