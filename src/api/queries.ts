import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  getNFTById,
  getNFTsByWalletAddress,
  storeNFTDataRequest,
  updateNFTStatusRequest,
} from "./apis";
import { NFT } from "@/constant/types";
import {
  ErrorResponse,
  IStoreNFTData,
  IUpdateNFTStatus,
  RStoreNFTData,
  RUpdateNFTStatus,
} from "./types";

export const useGetNFTById = ({ nftId }: { nftId: number }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nft", { nftId }],
    queryFn: () => getNFTById({ nftId }),
  });
  const nft: NFT = data?.data;

  return { nft, isLoading, isError };
};

export const useGetNFTsByWalletAddress = ({
  walletAddress,
  status,
}: {
  walletAddress: string;
  status: string;
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nfts", { walletAddress, status }],
    queryFn: () => getNFTsByWalletAddress({ walletAddress }),
  });
  const nfts: NFT[] = data?.data?.data;

  return { nfts, isLoading, isError };
};

export const useStoreNFTData = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RStoreNFTData>) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<RStoreNFTData>,
    AxiosError<ErrorResponse>,
    IStoreNFTData
  >({
    mutationFn: storeNFTDataRequest,
    onError,
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["nfts"] });
    },
  });
};

export const useUpdateNFTStatus = (
  onError: (error: AxiosError<ErrorResponse>) => void,
  onSuccess: (data: AxiosResponse<RUpdateNFTStatus>) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<
    AxiosResponse<RUpdateNFTStatus>,
    AxiosError<ErrorResponse>,
    IUpdateNFTStatus
  >({
    mutationFn: updateNFTStatusRequest,
    onError,
    onSuccess: (data) => {
      onSuccess(data);
      queryClient.invalidateQueries({ queryKey: ["nfts"] });
    },
  });
};
