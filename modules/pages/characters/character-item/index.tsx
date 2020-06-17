import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useCharacter } from "@/libs/query/characters";

const Character: React.FC = () => {
  const router = useRouter();

  const { data } = useCharacter(parseInt(router.query.id as string));

  if (!data) {
    return null;
  }

  const locationId = data.location.url.split("/").slice(-1)[0];
  const episodeIds = data.episode.map(
    (episodeUrl) => episodeUrl.split("/").slice(-1)[0]
  );

  return (
    <>
      <div>
        <b>{data.name}</b>
      </div>
      <div>
        <img alt={data.name} src={data.image} />
      </div>
      <div>
        <b>Status</b>
      </div>
      <div>{data.status}</div>
      <div>
        <b>Species</b>
      </div>
      <div>{data.species}</div>
      <div>
        <b>Gender</b>
      </div>
      <div>{data.gender}</div>
      <div>
        <b>Location</b>
      </div>
      <div>
        <Link
          href="/locations/view/[id]"
          passHref
          as={`/locations/view/${locationId}`}
        >
          <a>{data.location.name}</a>
        </Link>
      </div>
      <div>
        <b>Episodes</b>
      </div>
      <div>
        {episodeIds.map((episodeId) => {
          return (
            <div key={episodeId}>
              <Link
                href="/episodes/view/[id]"
                passHref
                as={`/episodes/view/${episodeId}`}
              >
                <a>{episodeId}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Character;
