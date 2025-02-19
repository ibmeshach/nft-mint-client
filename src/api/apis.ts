import { request } from "@/utils/axios-utils";
import {
  IStoreNFTData,
  IUpdateNFTStatus,
  RStoreNFTData,
  RUpdateNFTStatus,
} from "./types";
import { AxiosResponse } from "axios";

export const getNFTById = ({ nftId }: { nftId: number }) => {
  return request({ url: `/nfts/${nftId}` });
};

export const getNFTsByWalletAddress = ({
  walletAddress,
}: {
  walletAddress: string;
}) => {
  return request({
    url: `/nfts/gallery/all?userWalletAddress=${walletAddress}`,
  });
};

export const storeNFTDataRequest = async (
  formdata: IStoreNFTData
): Promise<AxiosResponse<RStoreNFTData>> => {
  return request({
    url: "/nfts/store-nft",
    method: "post",
    data: formdata,
  });
};

export const updateNFTStatusRequest = async (
  formdata: IUpdateNFTStatus
): Promise<AxiosResponse<RUpdateNFTStatus>> => {
  return request({
    url: "/nfts/minted-status",
    method: "patch",
    data: formdata,
  });
};
