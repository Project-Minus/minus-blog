import { CSSProperties } from "react";
import "@/styles/spinner.scss";

interface Props extends CSSProperties {
  size: "small" | "medium" | "large" | "extraLarge";
}

export default function Spinner(props: Props) {
  const { size = "medium", ...rest } = props;
  const getCircleWithSize = (
    circleSize: "small" | "medium" | "large" | "extraLarge",
  ): { box: number; circle: number } => {
    if (circleSize === "small") {
      return {
        box: 24,
        circle: 20,
      };
    }
    if (circleSize === "medium") {
      return {
        box: 36,
        circle: 28,
      };
    }
    if (circleSize === "large") {
      return {
        box: 72,
        circle: 60,
      };
    }
    if (circleSize === "extraLarge") {
      return {
        box: 100,
        circle: 80,
      };
    }
    return {
      box: 72,
      circle: 60,
    };
  };
  const progressSize = getCircleWithSize(size);
  const dashArray = Math.PI * 2 * (progressSize.circle / 2);

  return (
    <div
      className="progress"
      style={{
        position: "absolute",
        height: "100%",
        ...rest,
      }}
    >
      <svg
        className={`progress__box--${size}`}
        width={progressSize.box}
        height={progressSize.box}
        viewBox={`0 0 ${progressSize.box} ${progressSize.box}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          strokeDasharray={dashArray}
          strokeDashoffset={0}
          opacity="0.1"
          cx={progressSize.box / 2}
          cy={progressSize.box / 2}
          r={progressSize.circle / 2}
          stroke="black"
        />
        <circle
          opacity="1"
          cx={progressSize.box / 2}
          cy={progressSize.box / 2}
          r={progressSize.circle / 2}
          stroke="rgba(243, 115, 33, 1)"
        />
      </svg>
    </div>
  );
}
