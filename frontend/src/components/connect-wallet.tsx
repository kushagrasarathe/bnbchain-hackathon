"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";

export const ConnectWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
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
                  <Button
                    size={"lg"}
                    className="rounded-none text-base p-6"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    size={"lg"}
                    variant={"destructive"}
                    onClick={openChainModal}
                    type="button"
                    className="rounded-none text-base p-6"
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div className="flex items-center gap-2">
                  <Button
                    size={"sm"}
                    className="rounded-none text-base py-3 px-4 flex items-center"
                    variant={"outline"}
                    onClick={openChainModal}
                  >
                    {chain.hasIcon && (
                      <div className="mx-2">
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </Button>
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    onClick={openAccountModal}
                    className="rounded-none text-base py-3 px-4"
                    type="button"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
