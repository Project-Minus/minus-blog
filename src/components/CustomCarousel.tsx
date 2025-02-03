import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Article } from "@/type/tableType";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButtons";
import { DotButton, useDotButton } from "./CarouselDots";
import styles from "../styles/carousel.module.scss";
import Card from "./Card";

interface Props {
  slides: Array<Article>;
  options?: EmblaOptionsType;
}

export default function CustomCarousel(props: Props) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const selectedDotClass = (index: number) => {
    return styles[
      "carousel__dot".concat(
        index === selectedIndex ? " carousel__dot--selected" : "",
      )
    ];
  };

  return (
    <section className={styles.carousel}>
      <div className={styles.carousel__viewport} ref={emblaRef}>
        <div className={styles.carousel__container}>
          {slides.map((data, index) => (
            <div className={styles.carousel__slide} key={index}>
              <Card article={data} key={index} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carousel__controls}>
        <div className={styles.carousel__buttons}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className={styles.carousel__dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={selectedDotClass(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
