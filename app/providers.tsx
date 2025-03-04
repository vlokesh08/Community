"use client";

import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from "react";

// const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  return <SessionProvider>
    <QueryClientProvider client={queryClient}>
    {children}
    </QueryClientProvider>
    </SessionProvider>;
}