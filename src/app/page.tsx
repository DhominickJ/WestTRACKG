import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import { Button } from "@/components/ui/button";
import { Poppins } from 'next/font/google'
import ContentLoader from "./components/content-loader";
import { checking } from "@/lib/firebase";

const inter = Poppins({
  subsets: ['latin'],
  weight: ["200", "400", "600"], 
  style: ['normal', 'italic'],

})

export default function LandingPage() {
  return (
    <>
      <Header />
      <RequestBtn />
      <div>
        <Image
          src="/images/Home_bg.png"
          alt="background"
          layout="responsive"
          width={1000}
          height={100}
        />
      </div>
      <ContentLoader
        header="Fast and Reliable"
        content="Every request goes through a seamless process, giving you updates in real-time – no more endless waiting."
        imgSrc="/icons/paper_fast.png"
        imgPos="right"
      />
      <ContentLoader
        header="Effortless Experience"
        content="Our system guides your requests from start to finish with clarity and ease – making the process straightforward and stress-free."
        imgSrc=""
        imgPos="left"
      />
      {checking()}
    </>
  );
}
