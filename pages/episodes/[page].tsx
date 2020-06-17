import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

import Suspensable from "@/libs/suspensable";
import { getEpisodes } from "@/libs/query/episodes";

import EpisodeList from "@/page-modules/episodes/episode-list";

const Index: React.FC = () => {
  return (
    <>
      <h1>Episodes</h1>

      <Suspensable>
        <EpisodeList />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { info } = await getEpisodes(null, 1);

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
          key: ["episodes", page],
          data: await getEpisodes(null, page),
        },
      ],
    },
  };
};

export default Index;
