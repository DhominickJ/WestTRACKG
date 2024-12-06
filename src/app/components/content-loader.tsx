import Image from "next/image";

interface ContentLoaderProps {
  header: string;
  content: string;
  imgSrc: string;
  imgPos: string;
}

function ContentLoader({
  header,
  content,
  imgSrc,
  imgPos,
}: ContentLoaderProps) {
  return (
    <div className="size-full w-full h-500 p-32 bg-white flex items-center">
      {imgPos === "left" && (
        <div className="size-full flex items-center justify-center px-10">
          <Image src={imgSrc} alt="icon" width={500} height={100} />
          <div className="pr-10">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
        </div>
      )}
      {imgPos === "right" && (
        <div className="size-full flex items-center justify-center px-10">
          <div className="pl-10">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
          <Image
            src={imgSrc}
            alt="icon"
            width={500}
            height={100}
            className="right"
          />
        </div>
      )}
      {imgPos === "center" && (
        <div className="size-full flex items-center justify-center px-10">
          <div className="pl-10">
            <h3 className="font-bold text-3xl pb-5">{header}</h3>
            <p className="w-1/2">{content}</p>
          </div>
          <Image
            src={imgSrc}
            alt="icon"
            width={100}
            height={100}
            className="center"
          />
        </div>
      )}
    </div>
  );
}

export default ContentLoader;
