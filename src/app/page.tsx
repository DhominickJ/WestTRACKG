import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Header />
      <RequestBtn text={"React Sucks!"} />
      <div>
        <Image
          src="/images/Home_bg.png"
          alt="background"
          layout="responsive"
          width={1000}
          height={100}
        />
      </div>
    </>
  );
}
