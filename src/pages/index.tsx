//Component home da aplicação, ou seja, a rota vazia vem para ele.

/*
  Existem três formas de fazer comunicação com API:
  1. SPA -> Single page aplication, ou seja, em qualquer projeto REACT TRADICIONAL. (Porblemas de indexação e busca pelo browsere)
  2. SSR -> Server Side Redding, ou seja, para NEXT. Nesse caso, sempre q alguém acessar a página vai fazer a requisição.
  3. SSG -> Server Side Generation, ou seja, para NEXT. Nesse caso, a página vai fazer a requisição quando for necessário. De quanto em quanto tempo eu quiser.
*/

import Image from 'next/image'; //É um componente Image do next que facilita o carregamento de imagens. É legal usar quando não sabemos como a imagem é ou vem.
import Link from 'next/link';
import format from "date-fns/format";
import { GetStaticProps } from "next";
import { api } from "../services/api";
import ptBR from "date-fns/locale/pt-BR";
import parseISO from "date-fns/parseISO";
import styles from '../pages/home.module.scss'
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";


type Episode = {
  id: string,
  title: string,
  thumbnail: string,
  members: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map( episode => {
            return (
              <li key={episode.id}>
                
                <div className={styles.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      
      <section className={styles.allEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
            <thead>
                <tr>
                <th></th>
                <th>Podcast</th>
                <th>Integrantes</th>
                <th>Data</th>
                <th>Duração</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allEpisodes.map( episode => {
                return (
                  <tr key={episode.id}>
                    <td style={{ width: 72}}>
                      
                    </td>
                    <td>
                      <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                      </Link>
                    </td>
                    <td>{episode.members}</td>
                    <td style={{ width: 100}}>{episode.publishedAt}</td>
                    <td>{episode.durationAsString}</td>
                    <td>
                      <button>
                        <img src="/play-green.svg" alt="Tocar episódio"/>
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
        </table>

      </section>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
