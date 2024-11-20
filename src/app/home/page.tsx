import Image from "next/image";
import Greet from "../components/greet";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Header />

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
