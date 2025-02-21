import "@/styles/category.scss";
import { convertTime } from "@/utils/time";

interface Props {
  articleId: string;
  createdAt: Date;
  isFavorite: boolean;
  changeFavorites: (value: boolean) => void;
}
export default function ArticleInfoLine(props: Props) {
  const { articleId, createdAt, isFavorite, changeFavorites } = props;
  const favoriteClass = isFavorite ? "favorite" : "unFavorite";
  const handleClickFavorite = () => {
    if (typeof window === "undefined") {
      return;
    }

    const favorites = window.localStorage.getItem("favorite");
    const favoriteList: Array<string> = favorites ? JSON.parse(favorites) : [];

    if (favoriteList.includes(articleId as string)) {
      const updatedFavorites = favoriteList.filter((el) => el !== articleId);
      window.localStorage.setItem("favorite", JSON.stringify(updatedFavorites));
      changeFavorites(false);
    } else {
      favoriteList.push(articleId as string);
      window.localStorage.setItem("favorite", JSON.stringify(favoriteList));
      changeFavorites(true);
    }
  };
  return (
    <div className="infos">
      <div className="info">
        <span>Kyle , {convertTime(createdAt)}</span>
        <button
          type="button"
          className={favoriteClass}
          onClick={handleClickFavorite}
        >
          즐겨찾기
        </button>
      </div>
      <div className="infos_line" />
    </div>
  );
}
