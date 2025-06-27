"use client";
import { QueryClientProvider as QCProvider } from "@tanstack/react-query";
import { queryClient } from "@/api";

export default function QueryClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
   return <QCProvider client={queryClient}>{children}</QCProvider>
}