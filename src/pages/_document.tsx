/* 
    O _document funciona como o index.html. Nos usamos ele para definir algo globalmente no html da aplicação, 
    pq se a gente colocar no component app ele vai ficar recarregando a aplicação todas as vezes que mudar o 
    component, nesse caso isso não acontece. O next pede que esse arquivo em específico seja em modo de Class!
*/

import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
