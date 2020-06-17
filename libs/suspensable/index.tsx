import React, { Suspense, useState, useEffect } from 'react';

const Suspensable: React.FC = ({ children }) => {
  const [withSuspense, setWithSuspense] = useState(false);

  useEffect(() => {
    setWithSuspense(true);
  }, []);

  if (!withSuspense) {
    return <>{children}</>;
  }

  return <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>;
};

export default Suspensable;
