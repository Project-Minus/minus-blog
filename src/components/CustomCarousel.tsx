import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Article } from "@/type/tableType";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButtons";
import { DotButton, useDotButton } from "./CarouselDots";
import "../styles/carousel.scss";
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
    return index === selectedIndex
      ? "carousel__dot--selected"
      : "carousel__dot";
  };

  return (
    <section className="carousel">
      <div className="carousel__viewport" ref={emblaRef}>
        <div className="carousel__container">
          {slides.map((data, index) => (
            <div className="carousel__slide" key={index}>
              <Card article={data} key={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="carousel__controls">
        <div className="carousel__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="carousel__dots">
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
