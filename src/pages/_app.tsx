/*
  O app é o component que fica em volta de toda a nossa aplicação. 
  A partir dele o next consegue controlar o roteamento da aplicação 
  e fazer o redirecionamento para cada component.
*/

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import { PlayerContextProvider } from '../contexts/PlayerContext';

import "../styles/global.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp;
