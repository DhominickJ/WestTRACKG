import Image from "next/image";
import Greet from "../components/greet";
import Header from "../components/header";

export default function Home() {
  return (
    <>
      <Header />
      <Greet />
      <h1>This is WestTrack Home Directory!</h1>
    </>
  );
}
