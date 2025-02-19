"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaWallet } from "react-icons/fa6";
import Image from "next/image";
const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    style={{
                      background:
                        "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
                    }}
                    className="btn-connect"
                  >
                    <FaWallet className="text-lg" />
                    <p className="text-base">Connect Wallet</p>
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    style={{
                      background:
                        "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
                    }}
                    className="btn-connect"
                  >
                    <p className="text-base">Wrong Network</p>
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-3">
                  <button
                    onClick={openChainModal}
                    className="max-2xs:hidden flex items-center gap-2 text-white px-4 sm:px-6 py-2.5 xs:py-3 rounded-xl sm:rounded-full bg-gray-800 hover:bg-gray-700"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 16,
                          height: 16,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={16}
                            height={16}
                            className=""
                          />
                        )}
                      </div>
                    )}
                    <span className="text-base max-sm:hidden">
                      {chain.name}
                    </span>
                  </button>

                  <button
                    onClick={openAccountModal}
                    style={{
                      background:
                        "linear-gradient(90deg, #EC4899 0%, #8B5CF6 100%)",
                    }}
                    className="btn-connect"
                  >
                    <FaWallet className="text-lg" />
                    <p className="text-sm sm:text-base">
                      {account.displayName}
                      <span className="hidden 2xs:inline">
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </span>
                    </p>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ConnectBtn;
