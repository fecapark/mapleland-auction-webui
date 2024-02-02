"use client";

import AutoHeightImage from "../../../utils/AutoHeightImage/AutoHeightImage";

export default function LandingLogo({
  hiddenWhenXS = false,
}: {
  hiddenWhenXS?: boolean;
}) {
  return (
    <div
      className={`max-w-[300px] w-full xs:max-w-[400px] mb-4 ${
        hiddenWhenXS ? "hidden xs:block" : ""
      }`}
    >
      <AutoHeightImage src="/logo.png" alt="" />
    </div>
  );
}
