// layout.tsx
"use client";

import { Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../store/store";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>{children}</body>
      </html>
    </Provider>
  );
}
