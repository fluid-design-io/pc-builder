import Image from "next/image";
import clsxm from "../../lib/clsxm";

export const IndexCover = ({ index }: { index: number }) => {
  const dataURLs = [
    {
      index: 1,
      dataURL:
        "UklGRkwAAABXRUJQVlA4IEAAAADQAQCdASoQAAsAAgA0JZwAAtz+dy98AAD+/m6PfC/kPMUS/9kIu6QgMQ7PML5mt3i87My4Qqzp+ux64wIMAAAA",
    },
    {
      index: 2,
      dataURL:
        "UklGRoQAAABXRUJQVlA4IHgAAABQAgCdASoQAAsAAgA0JZgCdAYt9jOPeM04YgAA/v4rNYB/Fq8DKCpDfs6eUd+eFWe62pBv5FX39pb04U9ysuTi0SWZs/dxBX8RLh3NQTa2HKB1jyTzp3Ljp9oMw+RV7H/oKhRrQMp9FLyhTyvhs8tpI2uqifquoAA=",
    },
    {
      index: 3,
      dataURL:
        "UklGRpgAAABXRUJQVlA4IIwAAABQAgCdASoQAAsAAgA0JYgCdAYpRv042/6t3wAA/vb+c48lRvPaxK4Lv7h1iH+57GX0A8cRDbibOv3oI168rYQU2QnubAPOt05JHlGYoYSBCRaiNn/w167Q3LZkdObwJGSoZEyhwU6IwybWhZMtUCtPPZJeVR+Qe/63+9u6/s8T/XIF/qucPB9wUBvgAA==",
    },
    {
      index: 4,
      dataURL:
        "UklGRqgAAABXRUJQVlA4IJwAAADwAgCdASoQAAsAAgA0JbACdG1/DxKIgB2p4mzhLlkVAAD+6jmoPCI68Mvd3sTPxZevHK3dzip8Zex0yjp3ZDGko6U/xPzttt733COIs/xPkmroG3L5hdJvqnRQUfnWrmqLjVFLuH+6YJ+pCvpnL/UkkePcHmVk+msg+V7Fh2unEdtAiwRRnss3jrcEPsfg5r5v46WV6ybdD+AAAAA=",
    },
  ];
  return (
    <div className={clsxm("absolute inset-0 z-[1] opacity-25 dark:opacity-75")}>
      <Image
        src={`/assets/cover/pc-${index}.jpg`}
        alt='PC Cover'
        width={3000}
        height={2000}
        className={clsxm(
          "index-cover object-cover object-center",
          "bg-white [mask-image:linear-gradient(270deg,rgba(255,255,255,0.85)_20%,rgba(255,255,255,0))] dark:bg-gray-700"
        )}
        placeholder='blur'
        blurDataURL={`data:image/webp;base64,${dataURLs[index - 1].dataURL}`}
      />
    </div>
  );
};
