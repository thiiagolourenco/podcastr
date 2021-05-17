import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link';
import Head from 'next/head';

import { GetStaticPaths, GetStaticProps } from 'next';

import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
  description: string;
};

type EpisodeProps = {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div 
        className={styles.description} 
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  )
}

/*
  Esse método é obrigatório para todo component que estiver usando o getStaticProps e tiver parâmetros dinâmicos(nesse caso o slug).
  Dinêmico porque ainda não sabemos oq carregar estaticamente. No caso os paths são os caminhos q eu quero carregar estaticamente.
  O fallback determina o funcionamento de um página q NÃO foi colocada no path, ou seja, não foi gerada de forma estática. Se eu passar fallback false
  e não tiver nd no path vai dar 404 para as páginas. No caso do true, ele tenta buscar os dados, mas a requisição é feita pelo lado do client e 
  só quando o usuário abrir a página. No caso do blocking o fallback ele roda a requisição no lado do next, ou seja, o usuário só vai pra página quando
  os dados forem carregados. (increment static regenaration) 
*/
export const getStaticPaths: GetStaticPaths = async () => {

  const { data } = await api.get("episodes", {
    params: {
      _limit: 2,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const paths = data.map((episode) => {
    return {
      params:{
        slug: episode.id
      }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params;

  const { data } = await api.get(`/episodes/${slug}`)

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    description: data.description,
    url: data.file.url,
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}