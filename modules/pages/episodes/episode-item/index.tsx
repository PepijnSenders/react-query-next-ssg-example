import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useEpisode } from "@/libs/query/episodes";

const Episode: React.FC = () => {
  const router = useRouter();

  const { data } = useEpisode(parseInt(router.query.id as string));

  if (!data) {
    return null;
  }

  const characterIds = data.characters.map(
    (characterUrl) => characterUrl.split("/").slice(-1)[0]
  );

  return (
    <>
      <div>
        <b>{data.name}</b>
      </div>
      <div>{data.air_date}</div>
      <div>
        <b>Characters</b>
      </div>
      <div>
        {characterIds.map((characterId) => {
          return (
            <div key={characterId}>
              <Link
                href="/characters/view/[id]"
                passHref
                as={`/characters/view/${characterId}`}
              >
                <a>{characterId}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Episode;
