import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";

import Suspensable from "@/libs/suspensable";
import { getLocation, getLocations } from "@/libs/query/locations";
import Location from "@/page-modules/locations/location-item";

const LocationView: React.FC = () => {
  return (
    <>
      <h1>Location</h1>

      <Suspensable>
        <Location />
      </Suspensable>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { results } = await getLocations(null, 1);

  return {
    paths: results.map((location) => {
      return {
        params: {
          id: `${location.id}`,
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
          key: ["location", idParam],
          data: await getLocation(null, idParam),
        },
      ],
    },
  };
};

export default LocationView;
