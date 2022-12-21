import Image from "next/image";
import clsxm from "../lib/clsxm";

export const IndexCover = ({ index }: { index: number }) => {
  return (
    <div className={clsxm("absolute inset-0 z-[1] opacity-25 dark:opacity-75")}>
      <Image
        src={`/assets/cover/pc-${index}.jpg`}
        alt='PC Cover'
        width={3000}
        height={2000}
        className={clsxm(
          "object-cover object-center index-cover",
          "[mask-image:linear-gradient(270deg,rgba(255,255,255,0.85)_20%,rgba(255,255,255,0))] bg-white dark:bg-gray-700"
        )}
        priority
      />
    </div>
  );
};
