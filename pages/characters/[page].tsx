import React from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";

import Suspensable from "@/libs/suspensable";
import { getCharacters } from "@/libs/query/characters";

import CharacterList from "@/page-modules/characters/character-list";

const Index: React.FC = () => {
  return (
    <>
      <h1>Characters</h1>

      <Suspensable>
        <CharacterList />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { info } = await getCharacters(null, 1);

  return {
    paths: Array.from(new Array(info.pages), (_, pageNumber) => {
      return { params: { page: `${pageNumber + 1}` } };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext
) => {
  const page = parseInt(ctx.params.page as string) || 1;

  return {
    props: {
      queryInitialCache: [
        {
          key: ["characters", page],
          data: await getCharacters(null, page),
        },
      ],
    },
  };
};

export default Index;
