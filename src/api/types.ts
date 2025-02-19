import { NFT } from "@/constant/types";

export interface ErrorResponse {
  message: string | string[];
}

export interface IStoreNFTData {
  nftName: string;
  nftDescription: string;
  nftLogoUrl: string;
  userWalletAddress: string;
  nftId: number;
}

export type RStoreNFTData = {
  statusCode: number;
  message: string;
  data: NFT;
};

export interface IUpdateNFTStatus {
  nftId: number;
  status: boolean;
}

export type RUpdateNFTStatus = {
  statusCode: number;
  message: string;
};
