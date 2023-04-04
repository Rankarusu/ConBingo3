import React, {createRef, Suspense} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import SavedSheetsScroller from '../components/SavedSheetsScroller';
import {useAppDispatch} from '../hooks';
import {
  addSheet,
  removeSheet,
  useSavedSheets,
} from '../stores/savedSheetsSlice';

import {AppScreenProps} from '../navigation/types';
import {setCurrentSheet} from '../stores/currentSheetSlice';
import {load, share} from '../utils/io';
import {useSnackbar} from '../context/SnackbarContext';

const SavedSheets: React.FC<AppScreenProps<'SavedSheets'>> = () => {
  const {savedSheets, selectedSheet, selectedSheetIndex} = useSavedSheets();
  const dispatch = useAppDispatch();
  const {showSnackbar} = useSnackbar();
  const flatRef = createRef<FlatList>();

  const loadSheet = () => {
    const sheetToLoad = selectedSheet;
    if (!sheetToLoad) {
      showSnackbar('Something went wrong while loading the sheet.');
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
      file = await load();
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message);
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
      return;
    }
    await share(sheetToLoad.fields);
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
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
