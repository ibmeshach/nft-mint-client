"use client";
import { useGetNFTsByWalletAddress } from "@/api/queries";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import images from "../../../public/images";
import classNames from "classnames";
import { SectionWrapper } from "@/utils/hoc";
import { motion } from "framer-motion";

const Gallery = () => {
  // Use useAccount for real-time updates
  const { address, isConnected, isDisconnected, isConnecting, status } =
    useAccount();

  const { nfts } = useGetNFTsByWalletAddress({
    walletAddress: address || "",
    status,
  });

  const hasNFTs = nfts && nfts.length > 0 && isConnected && !isDisconnected;

  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Watch for status changes to handle disconnection
  useEffect(() => {
    if (status === "disconnected") {
      console.log("Wallet disconnected");
      setImageErrors({});
    }
  }, [status]);

  useEffect(() => {
    if (nfts) {
      setImageErrors({});
    }
  }, [nfts]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  // Don't render gallery if disconnected
  if (isDisconnected) {
    return (
      <div className="container mx-auto flex flex-col py-20 gap-2 justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-white">Your NFT Gallery</h2>
        <div className="flex h-full">
          <p className="text-white text-sm lg:text-base">
            Please connect your wallet to view your NFTs
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames("container mx-auto flex flex-col py-20", {
        "gap-2 justify-center items-center text-center": !hasNFTs,
        "gap-10": hasNFTs,
      })}
    >
      <h2 className="text-2xl font-bold text-white">Your NFT Gallery</h2>

      {hasNFTs ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {nfts.map((item, index) => (
            <motion.div
              key={`${item.nftId}-${item.nftLogoUrl}`}
              className={classNames(
                "transition-transform duration-300 ease-in-out hover:scale-105 bg-[#11182780] w-full flex flex-col rounded-xl border ",
                {
                  "border-[#10B981]": index === 0,
                  "border-[#1F2937]": index !== 0,
                }
              )}
            >
              <motion.div className="relative w-full h-[12rem] sm:h-[14rem] overflow-hidden rounded-t-xl">
                <Image
                  src={
                    imageErrors[index] || !item?.nftLogoUrl
                      ? images.defaultNft
                      : item.nftLogoUrl
                  }
                  alt={`${item.nftName} #${item.nftId}`}
                  style={{ objectFit: "cover" }}
                  fill
                  unoptimized
                  className="z-0 w-full h-full rounded-t-xl"
                  onError={() => handleImageError(index)}
                />
                {index === 0 && (
                  <div className="absolute top-4 right-4 rounded-full px-3 py-1 bg-[#10B98133] text-xs text-[#10B981]">
                    New
                  </div>
                )}
              </motion.div>
              <div className="flex flex-col gap-3.5 2xl:gap-4 px-6 py-6 ">
                <h2 className="text-white font-bold text-sm lg:text-base">
                  {item.nftName} #{item.nftId}
                </h2>
                <p className="text-[#9CA3AF] text-xs lg:text-sm">
                  {item.nftDescription}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-full">
          <p className="text-white text-sm lg:text-base">
            {isConnecting
              ? "Connecting to wallet..."
              : "No NFTs found, please mint your first one using the widget above"}
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionWrapper(Gallery);
