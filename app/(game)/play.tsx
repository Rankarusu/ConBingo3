import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {Button} from 'react-native-paper';
import BingoSheet from '@/components/BingoSheet';
import {AlertOptions, useAlert} from '@/context/AlertContext';
import {useSnackbar} from '@/context/SnackbarContext';
import {useAppDispatch} from '@/hooks';
import {AppScreenProps} from '@/navigation/types';
import {
  resetCurrentSheet,
  resetWin,
  setAlreadyLaunched,
  useCurrentSheet,
} from '@/stores/currentSheetSlice';
import {resetFields, useFields} from '@/stores/fieldsSlice';
import {addSheet} from '@/stores/savedSheetsSlice';
import Confetti from '@/components/Confetti';
import {Logger} from '@/utils/logger';
import confetti from 'canvas-confetti';
import {useNavigation, useRouter} from 'expo-router';

const Play: React.FC<AppScreenProps<'play'>> = () => {
  const dispatch = useAppDispatch();
  const {currentSheet, win, alreadyLaunched} = useCurrentSheet();
  const {fields} = useFields();
  const {showSnackbar} = useSnackbar();
  const {showAlert} = useAlert();
  const navigation = useNavigation();
  const router = useRouter();

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
    if (Platform.OS === 'web') {
      confetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        gravity: 0.8,
      });
      return;
    }
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
      cancelAction: () => router.push('/(game)/edit-fields'),
    };
  }, [dispatch, navigation]);

  useEffect(() => {
    if (fields.length >= 24 && currentSheet.length !== 25) {
      // our fields are only set on the second rendering. therefore we skip generating a field on the first
      Logger.info(
        `generating new sheet, currentSheet length: ${currentSheet.length}`,
      );
      dispatch(resetCurrentSheet(fields));
    }
  }, [fields, currentSheet, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (!alreadyLaunched) {
        Logger.info('first launch detected. Resetting fields.');
        dispatch(resetFields());
        dispatch(setAlreadyLaunched());
        return;
      }

      if (currentSheet.length !== 25 && fields.length < 24) {
        // no need to display the popup if current sheet is viable.
        // e.g. one got generated but afterwards the user deletes all fields
        Logger.info('not enough fields, showing alert');
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
      {Platform.OS !== 'web' && <Confetti confettiRef={confettiRef} />}
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
    flex: 1,
    // height: "100%", //web
    // justifyContent: "space-between", //web
    maxWidth: 1200,
    marginHorizontal: 'auto',
    // adjust pan does fuck all
    // for some reason, the keyboard pushed the buttons and sheet up
    // minHeight: Platform.OS === 'android' ? height - 64 : 0, // 64 is the default MD3 height
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
