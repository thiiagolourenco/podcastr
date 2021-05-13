//Component home da aplicação, ou seja, a rota vazia vem para ele.

/*
  Existem três formas de fazer comunicação com API:
  1. SPA -> Single page aplication, ou seja, em qualquer projeto REACT TRADICIONAL. (Porblemas de indexação e busca pelo browsere)
  2. SSR -> Server Side Redding, ou seja, para NEXT. Nesse caso, sempre q alguém acessar a página vai fazer a requisição.
  3. SSG -> Server Side Generation, ou seja, para NEXT. Nesse caso, a página vai fazer a requisição quando for necessário. De quanto em quanto tempo eu quiser.
*/
export default function Home(props) {
  return <></>;
}

/* export const getStaticProps: GetStaticProps = async () => {
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
}; */
