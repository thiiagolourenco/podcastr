/*
  Para realizar comunicação entre componentes ou entre páginas da aplicação o React usa o Contex API (contexto). 
  Os componentes que precisam ter essa comunicação entre eles podem ter um Context e cada um tem q ter especificado q precisa 
  dele. Para especificar é só colocar entre os componentes q vão precisar o contexto.provider q foi criar, como o link do roteamento. 
  É como se fosse um serviço no agular.
  
  Ideia de criação para comunicação: componentes q teram acesso --> onde a ação sai --> onde recebe a ação !
*/
import { useContext, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

import { PlayerContext } from "../../contexts/PlayerContext";

import styles from "./styles.module.scss";


export function Player() {

  //Criando uma referência para um elemento para poder trabalhar com ele.
  const audioRef = useRef<HTMLAudioElement>(null);

  const { 
    episodeList, 
    currentEpisodeIndex, 
    isPlaying, 
    togglePlay,
    setPlayingState
  } = useContext(PlayerContext);

  const episode = episodeList[currentEpisodeIndex];

  useEffect(()=>{
    if(!audioRef.current) {
      return;
    } 
    
    if(isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying])
  
  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="Tocando agora" />
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
          <div className={styles.currentEpisode}>
            <strong>Você está ouvindo:<br/>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        ) : (
          <div className={styles.emptyPlayer}>
            <strong>Selecione um podcast para ouvir</strong>
          </div>
        ) 
      }

      <footer className={!episode ? styles.empty : ''}>
        <div className={styles.progress}>
          <span>00:00</span>
          <div className={styles.slider}>
            {episode ? (
              <Slider
                trackStyle={{backgroundColor: '#04d361'}}
                railStyle={{backgroundColor: '#9f75ff'}}
                handleStyle={{borderColor: '#04d361', borderWidth: 4}}
              />
            ) : (
              <div className={styles.emptySlider} />
            )}
          </div>
          <span>00:00</span>
        </div>
        {/* os && é um if sem else */}
        {episode && (
          <audio
          src={episode.thumbnail}
          autoPlay
          ref={audioRef}
          onPlay={() => setPlayingState(true)}
          onPause={() => setPlayingState(false)}
          />
        )}

        <div className={styles.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>
          <button className={styles.playButton} disabled={!episode} onClick={() => togglePlay()}>
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>
          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar próxima" />
          </button>
          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
