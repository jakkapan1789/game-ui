import { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import Aos from "aos";
export default function Document() {
  React.useEffect(() => {
    Aos.init();
  }, []);
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
