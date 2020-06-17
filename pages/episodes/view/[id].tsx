import React from "react";
import { GetStaticPropsContext, GetStaticProps, GetStaticPaths } from "next";

import Suspensable from "@/libs/suspensable";
import { getEpisode, getEpisodes } from "@/libs/query/episodes";
import Episode from "@/page-modules/episodes/episode-item";

const EpisodeView: React.FC = () => {
  return (
    <>
      <h1>Episode</h1>

      <Suspensable>
        <Episode />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await getEpisodes(null, 1);

  return {
    paths: results.map((episode) => {
      return {
        params: {
          id: `${episode.id}`,
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
          key: ["episode", idParam],
          data: await getEpisode(null, idParam),
        },
      ],
    },
  };
};

export default EpisodeView;
