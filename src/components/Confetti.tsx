import React, {RefObject, memo} from 'react';
import {Dimensions} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';

const {height, width} = Dimensions.get('window');

interface ConfettiProps {
  confettiRef: RefObject<ConfettiCannon>;
}

const Confetti = (props: ConfettiProps) => (
  <ConfettiCannon
    autoStart={false}
    count={200}
    explosionSpeed={400}
    fallSpeed={2000}
    origin={{x: width / 2, y: height / 2}}
    fadeOut={true}
    autoStartDelay={0}
    ref={props.confettiRef}
  />
);

export default memo(Confetti);
