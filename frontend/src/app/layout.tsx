import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LE GALS // Enterprise Legal Audit Engine",
  description: "Automated compliance audit engine evaluating complex legal contracts and risk metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bgBase text-textPrimary antialiased selection:bg-accentRiskHigh selection:text-textPrimary">
        {children}
      </body>
    </html>
  );
}

