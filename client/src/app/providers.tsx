"use client";

import React from "react";
import StoreProvider from "@/state/redux";
import { Store } from "lucide-react";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return <StoreProvider>{children}</StoreProvider>;
};

export default Providers;
