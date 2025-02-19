import { NFT } from "@/constant/types";
import { create } from "zustand";

interface States {
  receipt: NFT | null;
}

interface Actions {
  setReceipt: (receipt: NFT | null) => void;
}

const useReceiptStore = create<States & Actions>()((set) => ({
  receipt: null,
  setReceipt: (receipt: NFT | null) => {
    set({ receipt });
  },
}));

export default useReceiptStore;
