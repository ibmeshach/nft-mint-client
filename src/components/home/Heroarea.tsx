"use client";
import { SectionWrapper } from "@/utils/hoc";
import { textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa6";
import { IoIosPlayCircle } from "react-icons/io";

const Heroarea = () => {
  return (
    <div className="container  py-16 xs:py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
        <motion.div
          variants={textVariant(0.1)}
          className="w-full xs:w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] flex flex-col gap-2.5 2xs:gap-4 xs:gap-6 sm:gap-8 lg:gap-10 justify-center items-center text-center mx-auto"
        >
          <h1 className="text-3xl 2xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
            Discover & Collect Extraordinary NFTs
          </h1>
          <p className="text-[#D1D5DB] text-sm  2xs:text-base sm:text-lg lg:text-xl">
            Enter the world of digital art and collectibles. Explore unique NFTs
            created by artists worldwide.
          </p>
        </motion.div>
        <div className="w-full flex items-center justify-center gap-2.5 2xs:gap-4">
          <button
            onClick={() => {
              const middleSection = document.getElementById("middle-section");
              if (middleSection) {
                middleSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{
              background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
            }}
            className="flex items-center gap-2 text-white px-5 2xs:px-6 sm:px-8 py-3 sm:py-4 rounded-lg xs:rounded-xl"
          >
            <FaRocket className="text-base sm:text-lg" />
            <p className="text-sm sm:text-base font-bold">Get Started</p>
          </button>
          <button
            onClick={() => {
              window.open(
                "https://www.loom.com/share/98dc340dc8c74b3e8a6c368d722b9d71?sid=03bf544e-3a94-47bd-9d64-50e99f9c0e54",
                "_blank",
                "noreferrer"
              );
            }}
            className="flex items-center gap-2 bg-[#1F293780] text-white px-5 2xs:px-6 sm:px-8 py-3 sm:py-4 rounded-lg xs:rounded-xl border border-[#374151]"
          >
            <IoIosPlayCircle className="text-base sm:text-lg" />
            <p className="text-sm sm:text-base">Watch Video</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Heroarea);
