"use client";
import useReceiptStore from "@/store/receipt.store";
import Heroarea from "./Heroarea";
import Receipt from "./Receipt";
import Gallery from "./Gallery";
import Mint from "./Mint";

const Home = () => {
  const { receipt } = useReceiptStore();
  return (
    <div className="h-full w-full flex flex-col">
      <Heroarea />
      <div id="middle-section">{receipt ? <Receipt /> : <Mint />}</div>
      <Gallery />
    </div>
  );
};

export default Home;
