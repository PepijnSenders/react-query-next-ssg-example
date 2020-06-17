import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

import Suspensable from "@/libs/suspensable";
import { getLocations } from "@/libs/query/locations";

import LocationList from "@/page-modules/locations/location-list";

const Index: React.FC = () => {
  return (
    <>
      <h1>Locations</h1>

      <Suspensable>
        <LocationList />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { info } = await getLocations(null, 1);

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
          key: ["locations", page],
          data: await getLocations(null, page),
        },
      ],
    },
  };
};

export default Index;
