interface Props {
  tick: any;
}

const getPriceContent = (value: number) => {
  if (value >= 1000000) return `${Math.floor(value / 1000000)}M`;
  if (value >= 1000) return `${Math.floor(value / 1000)}K`;
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
