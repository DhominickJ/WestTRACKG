import Image from "next/image";
import Header from "./components/header";
import RequestBtn from "./components/request";
import { Button } from "@/components/ui/button";
import { Poppins } from 'next/font/google'

const inter = Poppins({
  subsets: ['latin'],
  weight: ["200", "400", "600"], 
  style: ['normal', 'italic'],

})

export default function LandingPage() {
  return (
  <>
  <Header />
    <RequestBtn 
    className=""
      text={"React Sucks!"} />
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
