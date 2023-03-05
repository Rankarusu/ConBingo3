import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {StackRouteParameters} from '../routes';

const EditModal = () => {
  const route = useRoute<RouteProp<StackRouteParameters, 'editModal'>>();

  const {id} = route.params;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default EditModal;

const styles = StyleSheet.create({});
