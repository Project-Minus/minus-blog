import { ComponentPropsWithRef, useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";
import styles from "../styles/carousel.module.scss";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) {
        return;
      }
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((init: EmblaCarouselType) => {
    setScrollSnaps(init.scrollSnapList());
  }, []);

  const onSelect = useCallback((select: EmblaCarouselType) => {
    setSelectedIndex(select.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

type Props = ComponentPropsWithRef<"button">;

export function DotButton(props: Props) {
  const { children, className, ...restProps } = props;
  const newClassName = (className as string) ?? "";

  return (
    <button type="button" className={styles[newClassName]} {...restProps}>
      {children}
    </button>
  );
}
