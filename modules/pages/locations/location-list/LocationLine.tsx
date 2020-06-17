import React from 'react';
import Link from 'next/link';

import { Location } from '@/libs/query/locations';

interface LocationLineProps {
  location: Location;
}

const LocationLine: React.FC<LocationLineProps> = ({ location }) => {
  return (
    <>
      <div>
        <Link
          passHref
          href="/locations/view/[id]"
          as={`/locations/view/${location.id}`}>
          <a>{location.name}</a>
        </Link>
      </div>
    </>
  );
};

export default LocationLine;
