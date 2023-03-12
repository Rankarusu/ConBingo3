import React, {lazy, Suspense, useState} from 'react';
import {ActivityIndicator, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

const BingoSheet = lazy(() => import('../components/BingoSheet'));

const Play = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Suspense fallback={<ActivityIndicator />}>
        <BingoSheet />
      </Suspense>
      <View style={styles.buttonBox}>
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          onPress={() => console.log('Pressed')}>
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
