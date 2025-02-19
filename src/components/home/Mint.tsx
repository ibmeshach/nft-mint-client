"use client";
import { nftMintContractAbi } from "@/constant/abi";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSolidCube } from "react-icons/bi";
import * as yup from "yup";
import SpinnerLoader from "../SpinnerLoader";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/api/types";
import { AxiosResponse } from "axios";
import { RStoreNFTData } from "@/api/types";
import { useStoreNFTData, useUpdateNFTStatus } from "@/api/queries";
import toast from "react-hot-toast";
import { mintNFTContractAddress } from "@/constant";
import useReceiptStore from "@/store/receipt.store";
import { custom, useAccount } from "wagmi";
import { SectionWrapper } from "@/utils/hoc";
import { createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { createPublicClient } from "viem";

const schema = yup.object().shape({
  nftName: yup.string().required("NFT Name is required"),
  nftDescription: yup.string().required("NFT Description is required"),
  nftLogoUrl: yup
    .string()
    .required("NFT Image is required")
    .matches(/^https?:\/\/.+/, "Must be a valid URL starting with https://"),
});

type FormData = yup.InferType<typeof schema>;

const Mint = () => {
  const { address, isConnected } = useAccount();
  const { setReceipt } = useReceiptStore();
  const [loading, setLoading] = useState<{
    state: boolean;
    message: string;
  }>({
    state: false,
    message: "",
  });

  const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: custom(window.ethereum!),
  });

  const generateRandomId = () => {
    return Math.floor(Date.now() % 10000) + Math.floor(Math.random() * 1000);
  };

  const findAvailableId = async (): Promise<number> => {
    const randomId = generateRandomId();

    try {
      const isIdAlreadyExists = await publicClient.readContract({
        address: mintNFTContractAddress,
        abi: nftMintContractAbi,
        functionName: "checkId",
        args: [randomId],
      });

      if (isIdAlreadyExists) {
        return findAvailableId();
      }

      return randomId;
    } catch (error) {
      console.error("Error checking ID availability:", error);
      throw error;
    }
  };

  const form = useForm<FormData>({
    defaultValues: {
      nftName: "",
      nftDescription: "",
      nftLogoUrl: "",
    },
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const { register, handleSubmit, formState, reset } = form;
  const { errors } = formState;

  const onError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    toast.error(errorMessage as string);
    setLoading({
      state: false,
      message: "",
    });
  };

  const onSuccess = async (data: AxiosResponse<RStoreNFTData>) => {
    const res = data.data.data;
    const api = process.env.NEXT_PUBLIC_BACKEND_API;

    // Validate that we have an ID before proceeding
    if (!res?.nftId) {
      toast.error("Invalid NFT ID received");
      setLoading({
        state: false,
        message: "",
      });
      return;
    }

    setLoading({
      state: true,
      message: "Minting NFT...",
    });

    try {
      const metadataUrl = `${api}/api/nfts/${res?.nftId}`;

      const { request } = await publicClient.simulateContract({
        address: mintNFTContractAddress,
        abi: nftMintContractAbi,
        functionName: "mint",
        args: [res.nftId, metadataUrl],
        account: address,
      });

      const hash = await walletClient.writeContract(request);
      console.log("Transaction hash:", hash);
      setReceipt(res);
      updateNFTStatus({
        nftId: res.nftId,
        status: true,
      });
    } catch (error) {
      console.error("Error minting NFT:", error);
      toast.error("Error minting NFT");
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  const onUpdateError = (error: AxiosError<ErrorResponse>) => {
    const errorMessage = error?.response?.data?.message;
    toast.error(errorMessage as string);
    setLoading({
      state: false,
      message: "",
    });
  };

  const onUpdateSuccess = () => {
    toast.success("NFT minted successfully");
    setLoading({
      state: false,
      message: "",
    });
    reset();
  };

  const { mutate: storeNFTData } = useStoreNFTData(onError, onSuccess);
  const { mutate: updateNFTStatus } = useUpdateNFTStatus(
    onUpdateError,
    onUpdateSuccess
  );

  const onSubmit = async (data: FormData) => {
    try {
      setLoading({
        state: true,
        message: "Finding available NFT ID...",
      });
      const id = await findAvailableId();

      if (!id) {
        toast.error("Error finding available ID");
        return;
      }

      if (!address) {
        toast.error("Error getting wallet address");
        return;
      }

      setLoading({
        state: true,
        message: "Storing NFT data...",
      });

      storeNFTData({
        nftId: id,
        nftName: data.nftName,
        nftDescription: data.nftDescription,
        nftLogoUrl: data.nftLogoUrl,
        userWalletAddress: address,
      });
    } catch (error) {
      console.error("Error storing NFT data:", error);
      toast.error("Error storing NFT data");
      setLoading({
        state: false,
        message: "",
      });
    }
  };

  return (
    <div className="container w-full py-16 xs:py-20 flex justify-center items-center">
      <div className="w-full xs:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] flex flex-col gap-6 xs:gap-8 border border-[#1F2937] bg-[#11182780]  px-4 2xs:px-6 xs:px-8 sm:px-10 py-6 xs:py-8 sm:py-10 rounded-2xl ">
        <h2 className="text-white text-xl xs:text-2xl font-bold">
          Mint Your NFT
        </h2>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="nftName" className="text-[#9CA3AF] text-sm">
              NFT Name
            </label>

            <div className="flex flex-col gap-1">
              <input
                {...register("nftName")}
                type="text"
                id="nftName"
                placeholder="Enter NFT name"
                className={classNames(
                  "bg-[#1F2937] text-[#ADAEBC] text-base outline-none border rounded-lg px-4 py-3",
                  {
                    "border-red-400": errors.nftName,
                    "border-[#374151]": !errors.nftName,
                  }
                )}
              />
              {errors.nftName && (
                <p className="flex self-start text-red-400 text-xs ">
                  {errors.nftName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nftDescription" className="text-[#9CA3AF] text-sm">
              Description
            </label>

            <div className="flex flex-col gap-1">
              <textarea
                {...register("nftDescription")}
                id="nftDescription"
                placeholder="Describe your NFT"
                className={classNames(
                  "resize-y bg-[#1F2937] text-[#ADAEBC] text-base outline-none border rounded-lg px-4 py-3",
                  {
                    "border-red-400": errors.nftDescription,
                    "border-[#374151]": !errors.nftDescription,
                  }
                )}
              />
              {errors.nftDescription && (
                <p className="flex self-start text-red-400 text-xs ">
                  {errors.nftDescription.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="nftLogoUrl" className="text-[#9CA3AF] text-sm">
              Image URL
            </label>

            <div className="flex flex-col gap-1">
              <input
                {...register("nftLogoUrl")}
                type="text"
                id="nftLogoUrl"
                placeholder="Enter image URL"
                className={classNames(
                  "bg-[#1F2937] text-[#ADAEBC] text-base outline-none border rounded-lg px-4 py-3",
                  {
                    "border-red-400": errors.nftLogoUrl,
                    "border-[#374151]": !errors.nftLogoUrl,
                  }
                )}
              />
              {errors.nftLogoUrl && (
                <p className="flex self-start text-red-400 text-xs ">
                  {errors.nftLogoUrl.message}
                </p>
              )}
            </div>
          </div>
          <button
            style={{
              background: "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
            }}
            type="submit"
            disabled={!isConnected}
            className="disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center text-center gap-2 text-white rounded-lg px-4 py-4"
          >
            {isConnected ? (
              <>
                {loading.state ? (
                  <div className="flex items-center gap-2">
                    <SpinnerLoader width={25} height={25} color="#FFF" />
                    <p className="text-base font-bold">{loading.message}</p>
                  </div>
                ) : (
                  <>
                    <BiSolidCube className="text-xl" />
                    <p className="text-base font-bold">Mint NFT</p>
                  </>
                )}
              </>
            ) : (
              <p className="text-base font-bold">Connect Wallet</p>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SectionWrapper(Mint);
