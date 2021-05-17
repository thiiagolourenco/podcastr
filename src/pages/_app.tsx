/*
  O app é o component que fica em volta de toda a nossa aplicação. 
  A partir dele o next consegue controlar o roteamento da aplicação 
  e fazer o redirecionamento para cada component.
*/
import { useState } from "react";

import { Header } from "../components/Header";
import { Player } from "../components/Player";

import { PlayerContext } from '../contexts/PlayerContext';

import "../styles/global.scss";
import styles from "../styles/app.module.scss";

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
  } 


  return (
    <PlayerContext.Provider value={{episodeList, currentEpisodeIndex, play}}>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}

export default MyApp;
