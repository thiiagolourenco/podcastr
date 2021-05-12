/*
  O app é o component que fica em volta de toda a nossa aplicaçaõ. 
  A partir dele o next consegue controlar o roteamento da aplicação 
  e fazer o redirecionamento para cada component.
*/

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
