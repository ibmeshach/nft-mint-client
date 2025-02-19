import Image from "next/image";
import images from "../../public/images";
import ConnectBtn from "./ConnectButton";

const Navbar = () => {
  return (
    <div className="w-full flex flex-col bg-black">
      <div className="w-full flex justify-center bg-black/80 py-5 border-b border-[#1F2937]">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              alt="logo"
              src={images.logo}
              className="cursor-pointer w-5 sm:w-6"
            />
            <h2 className="text-white font-bold text-lg sm:text-xl">
              NFT Mint
            </h2>
          </div>

          <ConnectBtn />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
