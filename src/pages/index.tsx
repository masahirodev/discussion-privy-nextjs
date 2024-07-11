import { Privy } from "@/components/Privy";
import { PrivyCustomProvider } from "@/providers/PrivyCustomProvider";

export default function Home() {
  return (
    <>
      <PrivyCustomProvider>
        <Privy />
      </PrivyCustomProvider>
    </>
  );
}
