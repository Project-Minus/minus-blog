import React, {
  ComponentPropsWithRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EmblaCarouselType } from "embla-carousel";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined,
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((select: EmblaCarouselType) => {
    setPrevBtnDisabled(!select.canScrollPrev());
    setNextBtnDisabled(!select.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type Props = ComponentPropsWithRef<"button">;

export function PrevButton(props: Props) {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--prev carousel__button"
      type="button"
      {...restProps}
    >
      <AiOutlineArrowLeft />
    </button>
  );
}

export function NextButton(props: Props) {
  const { children, ...restProps } = props;

  return (
    <button
      className="embla__button embla__button--next carousel__button"
      type="button"
      {...restProps}
    >
      <AiOutlineArrowRight />
    </button>
  );
}
