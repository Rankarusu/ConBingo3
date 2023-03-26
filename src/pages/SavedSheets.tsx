import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import SavedSheetsScroller from '../components/SavedSheetsScroller';
import {useAppSelector} from '../hooks';
import {selectSavedSheets} from '../stores/savedSheetsSlice';

const SavedSheets = () => {
  const savedSheets = useAppSelector(selectSavedSheets);

  return (
    <View style={styles.wrapper}>
      <View style={styles.center}>
        <SavedSheetsScroller savedSheets={savedSheets} />
      </View>
      <View style={styles.buttonBox}>
        <Button
          compact
          style={styles.button}
          icon="open-in-new"
          mode="contained"
          onPress={() => {}}>
          Load
        </Button>
        <Button
          compact
          style={styles.button}
          icon="delete"
          mode="contained"
          onPress={() => {}}>
          Delete
        </Button>
        <Button
          compact
          style={styles.button}
          icon="import"
          mode="contained"
          onPress={() => {}}>
          Import
        </Button>
        <Button
          compact
          style={styles.button}
          icon="export"
          mode="contained"
          onPress={() => {}}>
          Export
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
