import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Button} from 'react-native-paper';
import BingoSheet from '../components/BingoSheet';
import {AlertOptions, useAlert} from '../context/AlertContext';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {AppScreenProps} from '../navigation/types';
import {
  resetCurrentSheet,
  resetWin,
  setAlreadyLaunched,
  useCurrentSheet,
} from '../stores/currentSheetSlice';
import {resetFields, useFields} from '../stores/fieldsSlice';
import {addSheet} from '../stores/savedSheetsSlice';
import Confetti from '../components/Confetti';

const {height} = Dimensions.get('window');

const Play: React.FC<AppScreenProps<'Play'>> = props => {
  const dispatch = useAppDispatch();
  const {currentSheet, win, alreadyLaunched} = useCurrentSheet();
  const {fields} = useFields();
  const {showSnackbar} = useSnackbar();
  const {showAlert} = useAlert();

  const confettiRef = useRef<ConfettiCannon>(null);

  const saveSheet = () => {
    dispatch(addSheet(currentSheet));
    showSnackbar('Sheet saved successfully!');
  };

  const rerollSheet = () => {
    if (fields.length < 24) {
      showAlert(alertOptions);
      return;
    }
    dispatch(resetCurrentSheet(fields));
  };

  const shootConfetti = () => {
    confettiRef.current?.start();
  };

  const alertOptions: AlertOptions = useMemo(() => {
    return {
      title: 'Reset Fields',
      content:
        'You do not have enough fields to generate a new sheet.\nEither add more fields or load the default ones.',
      confirmText: 'Load defaults',
      confirmAction: () => dispatch(resetFields()),
      cancelText: 'Add more fields',
      cancelAction: () => props.navigation.navigate('EditFields'),
    };
  }, [dispatch, props.navigation]);

  useEffect(() => {
    if (fields.length >= 24 && currentSheet.length !== 25) {
      // our fields are only set on the second rendering. therefore we skip generating a field on the first
      console.log('generating new field, invalid data');
      dispatch(resetCurrentSheet(fields));
    }
  }, [fields, currentSheet, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!alreadyLaunched) {
        console.log('first launch detected. Resetting fields.');
        dispatch(resetFields());
        dispatch(setAlreadyLaunched());
        return;
      }

      if (currentSheet.length !== 25 && fields.length < 24) {
        // no need to display the popup if current sheet is viable.
        // e.g. one got generated but afterwards the user deletes all fields
        console.log('not enough fields, showing alert');
        showAlert(alertOptions);
      }
    }, [
      fields.length,
      currentSheet.length,
      alreadyLaunched,
      alertOptions,
      showAlert,
      dispatch,
    ]),
  );

  useFocusEffect(
    useCallback(() => {
      if (win) {
        shootConfetti();
        showSnackbar('Winner, Winner Chicken Dinner!');
        dispatch(resetWin());
      }
    }, [win, dispatch, showSnackbar]),
  );

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
          onPress={rerollSheet}>
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
