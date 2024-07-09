interface Props {
  tick: any;
}

const getPriceContent = (value: number) => {
  const units = {
    억: 100000000,
    만: 10000,
    천: 1000,
  };

  for (const [unit, boundary] of Object.entries(units).sort(
    (a, b) => b[1] - a[1]
  )) {
    if (value >= boundary) {
      if (unit === "억" && value < 1000000000)
        return `${Math.floor((value / boundary) * 10) / 10}${unit}`;
      return `${Math.floor(value / boundary)}${unit}`;
    }
  }

  return value;
};

export default function LeftTick({ tick }: Props) {
  const value = parseInt(tick.value);

  return (
    <g
      key={tick.value}
      style={{
        transform: `translate(${tick.x}px, ${tick.y}px)`,
        opacity: tick.opacity,
      }}
    >
      <line
        x1="0"
        x2={tick.lineX}
        y1="0"
        y2={tick.lineY}
        style={{
          stroke: "rgb(119, 119, 119)",
          strokeWidth: 1,
        }}
      ></line>
      <text
        style={{
          alignmentBaseline: tick.textBaseline,
          textAnchor: tick.textAnchor,
          transform: `translate(${tick.textX}px, ${tick.textY}px)`,
          fontSize: 12,
          fill: "#c2c2c5",
          outlineWidth: 0,
          outlineColor: "transparent",
          letterSpacing: 0.5,
        }}
      >
        {getPriceContent(value)}
      </text>
    </g>
  );
}
