import { PrivyProvider } from "@privy-io/react-auth";
import { polygon } from "wagmi/chains";
import { polygonAmoy } from "./polygonAmoy";

export const PrivyCustomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultChain =
    process.env.NEXT_PUBLIC_BUILD_ENV === "development" ? polygon : polygonAmoy;

  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      // onSuccess={handleLogin}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: true,
        },
        // Configure your app's login methods
        // loginMethods: ["wallet", "email", "google", "twitter"],
        // Configure your app's branding and UIs
        appearance: {
          theme: "#FFFFFF",
          accentColor: "#6A6FF5",
          logo: "https://pub-dc971f65d0aa41d18c1839f8ab426dcb.r2.dev/privy.png",
          //   showWalletLoginFirst: true,
        },
        // Configure your app's legal policies
        legal: {
          // termsAndConditionsUrl: "https://your-terms-and-conditions-url",
          // privacyPolicyUrl: "https://your-privacy-policy-url",
        },
        defaultChain: defaultChain,
        supportedChains: [defaultChain],
      }}
    >
      {children}
    </PrivyProvider>
  );
};
