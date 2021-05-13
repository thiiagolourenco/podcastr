/*
  O app é o component que fica em volta de toda a nossa aplicação. 
  A partir dele o next consegue controlar o roteamento da aplicação 
  e fazer o redirecionamento para cada component.
*/
import "../styles/global.scss";
import styles from "../styles/app.module.scss";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player />
    </div>
  );
}

export default MyApp;
