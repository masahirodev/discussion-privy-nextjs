import { useEffect } from "react";

import { useToast, Text, Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";

import type { WalletWithMetadata } from "@privy-io/react-auth";

export const Privy = () => {
  const toast = useToast();
  const router = useRouter();

  const { ready, authenticated, user, logout, exportWallet } = usePrivy();

  const { login: privySign } = useLogin({
    onComplete: async (user, isNewUser, wasAlreadyAuthenticated) => {
      console.log(user, isNewUser, wasAlreadyAuthenticated);
      return user;
    },
    onError: async (error) => {
      console.log(error);
      toast({
        title: "Error login in with Privy. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (ready && !authenticated) {
      privySign();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, authenticated]);

  const linkedAccounts = user?.linkedAccounts || [];

  const wallets = linkedAccounts.filter(
    (a) => a.type === "wallet"
  ) as WalletWithMetadata[];

  const embeddedWallet = wallets.filter(
    (wallet) => wallet.walletClient === "privy"
  )?.[0];

  const onClickLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <>
      <Box
        w={"100%"}
        maxW={"460px"}
        mx={"auto"}
        minH={"calc(100vh - 155px - 76px)"}
      >
        <Flex direction={"column"} w={"100%"} mb={"80px"} px={"20px"}>
          <Box mb={"24px"}>
            <Heading>Export Wallet</Heading>
          </Box>

          <Box mb={"24px"}>
            {embeddedWallet && (
              <Box mb={"12px"}>
                <Heading>Target Wallet</Heading>
                <Text>{embeddedWallet.address}</Text>
              </Box>
            )}
          </Box>

          <Flex gap={"16px"} direction={"column"} w={"100%"}>
            <Button
              onClick={exportWallet}
              disabled={!(ready && authenticated)}
              w={"100%"}
            >
              Export Wallet
            </Button>

            <Button
              onClick={onClickLogout}
              disabled={!(ready && authenticated)}
              w={"100%"}
            >
              Logout
            </Button>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
