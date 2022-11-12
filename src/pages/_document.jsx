import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full">
      <Head />
      <body className="w-full h-full font-normal text-gray-900 font-inter bg-gray-50">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
