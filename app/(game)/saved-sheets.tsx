import SavedSheetsScroller from '@/components/SavedSheetsScroller';
import {useSnackbar} from '@/context/SnackbarContext';
import {useAppDispatch} from '@/hooks';
import {CheckableBingoField} from '@/models/checkableBingoField';
import {AppScreenProps} from '@/navigation/types';
import {setCurrentSheet} from '@/stores/currentSheetSlice';
import {addSheet, removeSheet, useSavedSheets} from '@/stores/savedSheetsSlice';
import {loadAndValidate, share} from '@/utils/io';
import {Logger} from '@/utils/logger';
import React, {createRef, Suspense} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';

export const bingoSheetRegex =
  /^\[(?:(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":(?:[0-9]|1[0-9]|2[0-3]))?},){24}(?:{"text":"(?:.*?)","checked":(?:true|false)(?:,"position":24)?}))\]$/;

const SavedSheets: React.FC<AppScreenProps<'saved-sheets'>> = () => {
  const {savedSheets, selectedSheet, selectedSheetIndex} = useSavedSheets();
  const dispatch = useAppDispatch();
  const {showSnackbar} = useSnackbar();
  const flatRef = createRef<FlatList>();

  const loadSheet = () => {
    const sheetToLoad = selectedSheet;
    if (!sheetToLoad) {
      showSnackbar('Something went wrong while loading the sheet.');
      Logger.error('tried to load empty sheet');
      return;
    }
    dispatch(setCurrentSheet(sheetToLoad.fields));
    showSnackbar('Sheet loaded successfully!');
  };

  const deleteSheet = () => {
    const idx = selectedSheetIndex;
    if (
      savedSheets[savedSheets.length - 1].id === idx &&
      savedSheets.length > 1
    ) {
      // without this the sheet just gets deleted and we are left with a blank list.
      // therefore we scroll to the second last item if the last one is about to be deleted.
      flatRef.current?.scrollToIndex({
        index: savedSheets.length - 2,
      });
    }
    dispatch(removeSheet(selectedSheetIndex));
    showSnackbar('Sheet deleted!');
  };

  const importSheet = async () => {
    let file;
    try {
      file = await loadAndValidate<CheckableBingoField[]>(bingoSheetRegex);
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message);
        Logger.error(error.message);
        return;
      }
    }
    if (!file) {
      return;
    }
    dispatch(addSheet(file));
    showSnackbar('Sheet imported successfully!');
  };

  const shareSheet = async () => {
    const sheetToLoad = selectedSheet;
    if (!sheetToLoad) {
      showSnackbar('Something went wrong while sharing the sheet.');
      Logger.error('tried to share empty sheet.');
      return;
    }
    await share(sheetToLoad.fields, 'bingo-sheet.txt');
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.center}>
        <Suspense fallback={<ActivityIndicator />}>
          <SavedSheetsScroller savedSheets={savedSheets} flatRef={flatRef} />
        </Suspense>
      </View>
      <View style={styles.buttonBox}>
        <Button
          compact
          style={styles.button}
          icon="open-in-new"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={loadSheet}>
          Load
        </Button>
        <Button
          compact
          style={styles.button}
          icon="delete"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={deleteSheet}>
          Delete
        </Button>
        <Button
          compact
          style={styles.button}
          icon="import"
          mode="contained"
          onPress={importSheet}>
          Import
        </Button>
        <Button
          compact
          style={styles.button}
          icon="share-variant"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={shareSheet}>
          Share
        </Button>
      </View>
    </View>
  );
};

export default SavedSheets;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    maxWidth: 1200,
    width: '100%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginHorizontal: 'auto',
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 6,
  },
  buttonBox: {
    padding: 6,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
  button: {
    flex: 1,
  },
});