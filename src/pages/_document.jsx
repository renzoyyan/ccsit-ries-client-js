import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="w-full font-normal text-gray-800 font-inter bg-slate-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
