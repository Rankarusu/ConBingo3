import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import SavedSheetsScroller from '../components/SavedSheetsScroller';
import Snackbar from '../components/Snackbar';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useSnackbar} from '../hooks/useSnackbar';
import {remove, selectSavedSheets} from '../stores/savedSheetsSlice';

const SavedSheets = () => {
  const savedSheets = useAppSelector(selectSavedSheets);
  const dispatch = useAppDispatch();

  const {snackbarRef, showSnackbar} = useSnackbar();

  return (
    <View style={styles.wrapper}>
      <View style={styles.center}>
        {savedSheets.length === 0 ? (
          <Text>You have no sheets saved at the moment.</Text>
        ) : (
          <SavedSheetsScroller savedSheets={savedSheets} />
        )}
      </View>
      <View style={styles.buttonBox}>
        <Button
          compact
          style={styles.button}
          icon="open-in-new"
          mode="contained"
          disabled={savedSheets.length === 0}
          onPress={() => {
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
            dispatch(remove(0));
            showSnackbar('Sheet deleted!');
          }}>
          Delete
        </Button>
        <Button
          compact
          style={styles.button}
          icon="import"
          mode="contained"
          onPress={() => {
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
          onPress={() => {}}>
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
