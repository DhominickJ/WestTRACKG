import Image from "next/image";

interface ContentLoaderProps {
  header: string;
  content: string;
  imgSrc: string;
  imgPos: string;
  bgColor: string;
}

function ContentLoader({
  header,
  content,
  imgSrc,
  imgPos,
  bgColor,
}: ContentLoaderProps) {
  return (
    <div
      className={`size-full w-full h-500 p-32 bg-${bgColor} flex items-center`}
    >
      {imgPos === "left" && (
        <div className="size-full flex items-center justify-center px-10">
          <Image
            src={imgSrc}
            alt="paper-fast-icon"
            width={500}
            height={100}
            className="left"
          />
          <div className="pr-10">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
        </div>
      )}
      {imgPos === "right" && (
        <div className={`size-full w-full flex items-center bg-${bgColor}`}>
          <div className="pl-10">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
          <Image
            src={imgSrc}
            alt="paper-fast-icon"
            width={500}
            height={100}
            className="right"
          />
        </div>
      )}
    </div>
  );
}

export default ContentLoader;
