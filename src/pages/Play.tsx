import React, {memo, RefObject, useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Button} from 'react-native-paper';
import BingoSheet from '../components/BingoSheet';
import {useAppDispatch, useAppSelector} from '../hooks';
import {generateSheet} from '../hooks/useGenerateSheet';
import {
  resetWin,
  selectCurrentSheet,
  selectWin,
  set,
} from '../stores/currentSheetSlice';
import {reset, selectFields} from '../stores/fieldsSlice';

interface ConfettiProps {
  confettiRef: RefObject<ConfettiCannon>;
}
const {height, width} = Dimensions.get('window');
const Confetti = memo((props: ConfettiProps) => (
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
));

const Play = () => {
  const currentSheet = useAppSelector(selectCurrentSheet);
  const win = useAppSelector(selectWin);
  const fields = useAppSelector(selectFields);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const confettiRef = useRef<ConfettiCannon>(null);

  const reroll = () => {
    const newSheet = generateSheet(fields);
    dispatch(set(newSheet));
  };

  const shootConfetti = () => {
    confettiRef.current?.start();
  };

  //idk if a useEffect is necessary here
  if (fields.length < 24) {
    console.log('not enough fields, resetting');
    //TODO: throw a warning here
    dispatch(reset());
  }
  if (!currentSheet || currentSheet.length !== 25) {
    console.log('generating new field, invalid data');
    reroll(); //TODO: on first launch out range in generateRandomNumbers is null
  }

  useEffect(() => {
    if (win) {
      shootConfetti();
      dispatch(resetWin());
    }
  }, [win, dispatch]);

  return (
    <View style={styles.wrapper}>
      <BingoSheet fields={currentSheet} />
      <Confetti confettiRef={confettiRef} />
      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          onPress={reroll}>
          Reroll
        </Button>
        <Button
          style={styles.button}
          icon="content-save"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Save
        </Button>
        <Button
          style={styles.button}
          icon={isEditing ? 'pencil-off' : 'pencil'}
          mode="contained"
          onPress={() => {
            console.log('Pressed');
            setIsEditing(!isEditing);
          }}>
          {isEditing ? 'Resume' : 'Edit'}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 6,
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  button: {
    flex: 1,
  },
});

export default Play;
