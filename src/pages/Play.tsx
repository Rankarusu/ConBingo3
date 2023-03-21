import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import BingoSheet from '../components/BingoSheet';
import {useAppDispatch, useAppSelector} from '../hooks';
import {generateSheet} from '../hooks/useGenerateSheet';
import {selectCurrentSheet, set} from '../stores/currentSheetSlice';
import {reset, selectFields} from '../stores/fieldsSlice';

const Play = () => {
  const currentSheet = useAppSelector(selectCurrentSheet);
  const fields = useAppSelector(selectFields);
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const reroll = () => {
    const newSheet = generateSheet(fields);
    dispatch(set(newSheet));
  };

  //idk if a useEffect si necessary here
  if (fields.length < 24) {
    console.log('not enough fields, resetting');
    dispatch(reset());
  }
  if (!currentSheet || currentSheet.length !== 25) {
    console.log('generating new field, invalid data');
    reroll();
  }

  return (
    <View style={styles.wrapper}>
      <BingoSheet fields={currentSheet} />
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
