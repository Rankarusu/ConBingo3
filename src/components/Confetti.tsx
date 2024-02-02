import React, { RefObject, memo } from 'react';

import { Dimensions } from 'react-native';

import ConfettiCannon from 'react-native-confetti-cannon';

interface ConfettiProps {
  confettiRef: RefObject<ConfettiCannon>;
}

const Confetti = (props: ConfettiProps) => {
  const { height, width } = Dimensions.get('window');

  return (
    <ConfettiCannon
      autoStart={false}
      count={100}
      explosionSpeed={400}
      fallSpeed={2000}
      origin={{ x: width / 2, y: height / 2 }}
      fadeOut={true}
      autoStartDelay={0}
      ref={props.confettiRef}
    />
  );
};

export default memo(Confetti);
