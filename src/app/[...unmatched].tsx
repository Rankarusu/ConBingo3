import React from 'react';

import { Redirect } from 'expo-router';

const Unmatched = () => {
  return <Redirect href={'/(game)/play'} />;
};

export default Unmatched;
