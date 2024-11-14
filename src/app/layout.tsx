// layout.tsx
"use client"; // This marks the file as a Client Component

import { Poppins } from "@next/font/google";
import { Provider } from "react-redux";
import store from "../store/store"; // Ensure correct import path
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
