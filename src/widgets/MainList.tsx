import ArticleList from "@/components/ArticleList";
import ListTitle from "@/components/ListTitle";
import styles from "../styles/mainList.module.scss";

export default function MainList() {
  return (
    <div className={styles.mainBox}>
      <ListTitle text="Recommended Article" />
      <ArticleList />
    </div>
  );
}
