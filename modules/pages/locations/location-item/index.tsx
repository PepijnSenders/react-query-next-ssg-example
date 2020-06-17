import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { useLocation } from "@/libs/query/locations";

const Location: React.FC = () => {
  const router = useRouter();

  const { data } = useLocation(parseInt(router.query.id as string));

  if (!data) {
    return null;
  }

  const characterIds = data.residents.map(
    (characterUrl) => characterUrl.split("/").slice(-1)[0]
  );

  return (
    <>
      <div>
        <b>{data.name}</b>
      </div>
      <div>{data.type}</div>
      <div>
        <b>Dimension</b>
      </div>
      <div>{data.dimension}</div>
      <div>
        <b>Residents</b>
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

export default Location;
