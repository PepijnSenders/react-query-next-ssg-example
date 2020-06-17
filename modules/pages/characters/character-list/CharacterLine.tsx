import React from 'react';
import Link from 'next/link';

import { Character } from '@/libs/query/characters';

interface CharacterLineProps {
  character: Character;
}

const CharacterLine: React.FC<CharacterLineProps> = ({ character }) => {
  return (
    <>
      <div>
        <Link
          passHref
          href="/characters/view/[id]"
          as={`/characters/view/${character.id}`}>
          <a>{character.name}</a>
        </Link>
      </div>
    </>
  );
};

export default CharacterLine;
