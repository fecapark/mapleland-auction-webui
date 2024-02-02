import Image from "next/image";

export default function DiscordEmoji({ id }: { id: string }) {
  return (
    <Image
      className="inline-block"
      src={`https://cdn.discordapp.com/emojis/${id}.webp?size=44&quality=lossless`}
      alt={id}
      width={22}
      height={22}
      style={{
        verticalAlign: "middle",
      }}
    />
  );
}
