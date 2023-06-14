import React, {lazy, Suspense, useEffect, useState} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks';
import {add, reset, selectFields} from '../stores/fieldsSlice';
import {BingoField} from '../models/bingoField';
import {selectCurrentSheet, set} from '../stores/currentSheetSlice';
import {generateSheet} from '../hooks/useGenerateSheet';
import BingoSheet from '../components/BingoSheet';

const Play = () => {
  const currentSheet = useAppSelector(selectCurrentSheet);
  const fields = useAppSelector(selectFields);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (fields.length < 24) {
      console.log('not enough fields, resetting');
      dispatch(reset());
    }
    if (!currentSheet || currentSheet.length !== 25) {
      console.log('generating new field, invalid data');
      const newSheet = generateSheet(fields);
      dispatch(set(newSheet));
    }
  }, [currentSheet, dispatch, fields]);

  return (
    <View style={styles.wrapper}>
      {/* <Suspense fallback={<ActivityIndicator />}> */}
      <BingoSheet fields={currentSheet} />
      {/* </Suspense> */}
      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          onPress={() => dispatch(add({id: 90, text: 'bleh'} as BingoField))}>
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
          onPress={() => console.log('Pressed')}>
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
