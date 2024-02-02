import Image, { ImageProps } from "next/image";

export default function AutoHeightImage({ alt, src }: ImageProps) {
  return (
    <div className="!relative">
      <Image
        className="!object-contain !relative !h-auto"
        fill
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" // 투명한 1x1 픽셀 이미지
      />
    </div>
  );
}
