import React from "react";
import { GetStaticPaths, GetStaticPropsContext, GetStaticProps } from "next";

import Suspensable from "@/libs/suspensable";
import { getCharacter, getCharacters } from "@/libs/query/characters";
import Character from "@/page-modules/characters/character-item";

const CharacterView: React.FC = () => {
  return (
    <>
      <h1>Character</h1>

      <Suspensable>
        <Character />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await getCharacters(null, 1);

  return {
    paths: results.map((character) => {
      return {
        params: {
          id: `${character.id}`,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const idParam = parseInt(ctx.params.id as string);

  return {
    props: {
      queryInitialCache: [
        {
          key: ["character", idParam],
          data: await getCharacter(null, idParam),
        },
      ],
    },
  };
};

export default CharacterView;
