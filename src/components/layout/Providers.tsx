"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, ReactNode } from "react";

interface IProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();
export const Providers: FC<IProvidersProps> = ({ children }) => {
    
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
