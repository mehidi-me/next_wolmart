import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />

          <link
            rel="preload"
            href="/assets/vendor/fontawesome-free/webfonts/fa-regular-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/vendor/fontawesome-free/webfonts/fa-solid-900.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/vendor/fontawesome-free/webfonts/fa-brands-400.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/assets/fonts/wolmart.woff?png09e"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
          {/* Vendor CSS */}
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/vendor/fontawesome-free/css/all.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/vendor/animate/animate.min.css"
          />

          <link
            rel="stylesheet"
            href="/assets/vendor/swiper/swiper-bundle.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          {/* Default CSS */}

          <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/style.min.css"
          />
          {/* <link
            rel="stylesheet"
            type="text/css"
            href="/assets/css/demo1.min.css"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
