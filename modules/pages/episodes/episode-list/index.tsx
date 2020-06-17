import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useEpisodes } from '@/libs/query/episodes';
import { Pagination } from '@material-ui/lab';

import EpisodeLine from './EpisodeLine';

const EpisodeList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  const { resolvedData } = useEpisodes(page);

  return (
    <>
      {resolvedData.results.map((episode) => {
        return <EpisodeLine episode={episode} key={episode.id} />;
      })}

      <Pagination
        count={resolvedData.info.pages}
        defaultPage={page}
        onChange={(e, page) => {
          setPage(page);

          router.push(`/episodes/[page]`, `/episodes/${page}`);
        }}
      />
    </>
  );
};

export default EpisodeList;
