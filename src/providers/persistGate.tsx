'use client';
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/config/redux";
import ReduxProvider from "@/config/redux/provider";

export default function PersistGateProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </ReduxProvider>
  );
}