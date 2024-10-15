import QueryClientProvider from "@/components/QueryClientProvider"
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

async function MyApp({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  return (
    <QueryClientProvider>
      <SessionProvider session={session}>{children}</SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
