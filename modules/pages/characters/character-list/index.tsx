import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useCharacters } from '@/libs/query/characters';
import { Pagination } from '@material-ui/lab';

import CharacterLine from './CharacterLine';

const CharacterList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  const { resolvedData } = useCharacters(page);

  return (
    <>
      {resolvedData.results.map((character) => {
        return <CharacterLine character={character} key={character.id} />;
      })}

      <Pagination
        count={resolvedData.info.pages}
        defaultPage={page}
        onChange={(e, page) => {
          setPage(page);

          router.push(`/characters/[page]`, `/characters/${page}`);
        }}
      />
    </>
  );
};

export default CharacterList;
