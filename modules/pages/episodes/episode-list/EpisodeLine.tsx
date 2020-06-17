import React from 'react';
import Link from 'next/link';

import { Episode } from '@/libs/query/episodes';

interface EpisodeLineProps {
  episode: Episode;
}

const EpisodeLine: React.FC<EpisodeLineProps> = ({ episode }) => {
  return (
    <>
      <div>
        <Link
          passHref
          href="/episodes/view/[id]"
          as={`/episodes/view/${episode.id}`}>
          <a>{episode.name}</a>
        </Link>
      </div>
    </>
  );
};

export default EpisodeLine;
