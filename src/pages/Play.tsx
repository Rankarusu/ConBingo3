import React, {memo, RefObject, useEffect, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Button} from 'react-native-paper';
import BingoSheet from '../components/BingoSheet';
import {useAppDispatch} from '../hooks';
import {AppScreenProps} from '../navigation/types';
import {
  resetCurrentSheet,
  resetWin,
  setCurrentSheet,
  useCurrentSheet,
} from '../stores/currentSheetSlice';
import {resetFields, useFields} from '../stores/fieldsSlice';
import {addSheet} from '../stores/savedSheetsSlice';
import {generateSheet} from '../utils/generateSheet';
import {useSnackbar} from '../context/SnackbarContext';

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

const Play: React.FC<AppScreenProps<'Play'>> = () => {
  const dispatch = useAppDispatch();
  const {currentSheet, win} = useCurrentSheet();
  const {fields} = useFields();
  const {showSnackbar} = useSnackbar();

  const confettiRef = useRef<ConfettiCannon>(null);

  const saveSheet = () => {
    dispatch(addSheet(currentSheet));
    showSnackbar('Sheet saved successfully!');
  };

  const shootConfetti = () => {
    confettiRef.current?.start();
  };

  useEffect(() => {
    if (fields.length < 24) {
      console.log('not enough fields, resetting');
      //TODO: throw alert here
      dispatch(resetFields());
    }
    if (fields.length > 1 && currentSheet.length !== 25) {
      // our fields are only set on the second rendering. therefore we skip generating a field on the first
      console.log('generating new field, invalid data');
      dispatch(resetCurrentSheet(fields));
    }
  }, [fields, currentSheet, dispatch]);

  useEffect(() => {
    if (win) {
      shootConfetti();
      showSnackbar('Winner, Winner Chicken Dinner!');
      dispatch(resetWin());
    }
  }, [win, dispatch, showSnackbar]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.center}>
        <BingoSheet fields={currentSheet} />
      </View>
      <Confetti confettiRef={confettiRef} />
      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          onPress={() => {
            dispatch(resetCurrentSheet(fields));
          }}>
          Reroll
        </Button>
        <Button
          style={styles.button}
          icon="content-save"
          mode="contained"
          onPress={saveSheet}>
          Save
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // adjust pan does fuck all
    // for some reason, the keyboard pushed the buttons and sheet up
    minHeight: height - 64, // 64 is the default MD3 height
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  buttonBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
    gap: 5,
  },
  button: {
    flex: 1,
  },
});

export default Play;
