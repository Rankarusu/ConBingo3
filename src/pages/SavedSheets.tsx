import React, {createRef, Suspense} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button} from 'react-native-paper';
import SavedSheetsScroller from '../components/SavedSheetsScroller';
import Snackbar from '../components/Snackbar';
import {useAppDispatch} from '../hooks';
import {useSnackbar} from '../hooks/useSnackbar';
import {
  addSheet,
  removeSheet,
  useSavedSheets,
} from '../stores/savedSheetsSlice';

import {load, share} from '../utils/io';
import {setCurrentSheet} from '../stores/currentSheetSlice';

const SavedSheets = () => {
  const {savedSheets, selectedSheet, selectedSheetIndex} = useSavedSheets();

  const dispatch = useAppDispatch();

  const flatRef = createRef<FlatList>();

  const [snackbarRef, showSnackbar] = useSnackbar();

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
          onPress={() => {
            const sheetToLoad = selectedSheet;
            if (!sheetToLoad) {
              showSnackbar('Something went wrong while loading the sheet');
              return;
            }
            dispatch(setCurrentSheet(sheetToLoad.fields));
            showSnackbar('Sheet loaded successfully!');
          }}>
          Load
        </Button>
        <Button
          compact
          style={styles.button}
          icon="delete"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={() => {
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
          }}>
          Delete
        </Button>
        <Button
          compact
          style={styles.button}
          icon="import"
          mode="contained"
          onPress={async () => {
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
          }}>
          Import
        </Button>
        <Button
          compact
          style={styles.button}
          icon="export"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={async () => {
            const sheetToLoad = selectedSheet;
            if (!sheetToLoad) {
              return;
            }
            await share(sheetToLoad.fields);
          }}>
          Export
        </Button>
      </View>
      <Snackbar ref={snackbarRef} style={styles.snackbar} />
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
  snackbar: {
    bottom: 50,
  },
});
