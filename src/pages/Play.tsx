import React, {lazy, Suspense} from 'react';
import {ActivityIndicator} from 'react-native-paper';

const BingoSheet = lazy(() => import('../components/BingoSheet'));

const Play = () => {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <BingoSheet />
    </Suspense>
  );
};

export default Play;
