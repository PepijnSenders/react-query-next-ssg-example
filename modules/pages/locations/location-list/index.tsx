import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useLocations } from '@/libs/query/locations';
import { Pagination } from '@material-ui/lab';

import LocationLine from './LocationLine';

const LocationList: React.FC = () => {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  const { resolvedData } = useLocations(page);

  return (
    <>
      {resolvedData.results.map((location) => {
        return <LocationLine location={location} key={location.id} />;
      })}

      <Pagination
        count={resolvedData.info.pages}
        defaultPage={page}
        onChange={(e, page) => {
          setPage(page);

          router.push(`/locations/[page]`, `/locations/${page}`);
        }}
      />
    </>
  );
};

export default LocationList;
