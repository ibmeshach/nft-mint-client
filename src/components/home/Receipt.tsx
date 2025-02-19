"use client";

import { BiSolidCube } from "react-icons/bi";
import { FaCheck, FaShareNodes } from "react-icons/fa6";
import Image from "next/image";
import useReceiptStore from "@/store/receipt.store";
import images from "../../../public/images";
import { useState } from "react";
import { SectionWrapper } from "@/utils/hoc";

const Receipt = () => {
  const { receipt, setReceipt } = useReceiptStore();
  const [imageError, setImageError] = useState<boolean>(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const api = process.env.NEXT_PUBLIC_BACKEND_API;
    const url = `${api}/api/nfts/${receipt?.nftId}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({
        url: url,
        title: "NFT Mint Receipt",
      });
    } else {
      // Fallback to download if sharing is not supported
      const link = document.createElement("a");
      link.download = `${receipt?.nftName}-${receipt?.nftId}`;
      link.href = url;
      link.click();
    }
  };
  return (
    <div className=" container w-full py-16 xs:py-20 flex justify-center items-center">
      <div className="w-full xs:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col justify-center items-center gap-4 xs:gap-5 border border-[#10B981] bg-[#11182780]  px-4 2xs:px-6 xs:px-8 sm:px-10 py-6 xs:py-8 sm:py-10 rounded-2xl ">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <div className="w-full flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 p-2 rounded-full bg-[#10B98133]">
              <FaCheck className="text-3xl xs:text-4xl text-[#10B981]" />
            </div>
            <div className="text-center flex flex-col items-center justify-center gap-1xs:gap-2">
              <h1 className="text-xl xs:text-2xl font-bold text-[#10B981]">
                NFT Minted Successfully!
              </h1>
              <p className="text-sm xs:text-base text-[#9CA3AF]">
                Your NFT has been created and added to your collection
              </p>
            </div>
          </div>

          <div className="w-full bg-[#1F293780] px-4 xs:px-6 py-4 xs:py-6 rounded-xl flex flex-col gap-2.5">
            <div className="relative w-full h-[10rem] sm:h-[12rem] xl:h-[20rem] rounded-lg  overflow-hidden">
              <Image
                src={
                  imageError || !receipt?.nftLogoUrl
                    ? images.defaultNft
                    : receipt.nftLogoUrl
                }
                alt="NFT image"
                style={{ objectFit: "cover" }}
                fill
                unoptimized
                className="z-0 w-full h-full rounded-lg"
                onError={() => setImageError(true)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-[#9CA3AF]">NFT Name</p>
                <p className="text-base font-bold text-white">
                  {receipt?.nftName}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-[#9CA3AF]">Description</p>
                <p className="text-base font-bold text-white">
                  {receipt?.nftDescription}
                </p>
              </div>

              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-[#9CA3AF]">NFT ID</p>
                <p className="text-base font-bold text-[#8B5CF6]">
                  #{receipt?.nftId}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col 2xs:flex-row items-center gap-4">
          <button
            onClick={handleShare}
            className="w-full flex justify-center items-center gap-2 bg-[#1F293780] text-white px-5 2xs:px-6 sm:px-8 py-3 sm:py-4 rounded-lg xs:rounded-xl "
          >
            <FaShareNodes className="text-base sm:text-lg" />
            <p className="text-sm sm:text-base">Share</p>
          </button>

          <button
            style={{
              background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
            }}
            className="w-full flex justify-center items-center gap-2 text-white px-5 2xs:px-6 sm:px-8 py-3 sm:py-4 rounded-lg xs:rounded-xl"
            onClick={() => {
              setReceipt(null);
              const middleSection = document.getElementById("middle-section");
              if (middleSection) {
                middleSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            <BiSolidCube className="text-xl" />
            <p className="text-sm sm:text-base font-bold">Mint Another</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Receipt);
