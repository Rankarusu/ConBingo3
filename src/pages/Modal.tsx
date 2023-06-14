/* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react/no-unstable-nested-components */
import {StackScreenProps} from '@react-navigation/stack';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import RootNavigationHeader, {
  RootNavigationHeaderProps,
} from '../components/RootNavigationHeader';
import {useAppDispatch, useAppTheme} from '../hooks';
import {StackRouteParamList} from '../routes';
import {addField, updateField, useFields} from '../stores/fieldsSlice';

type MemoizedHeaderProps = RootNavigationHeaderProps & {
  error: boolean;
  save: () => void;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => (
  <RootNavigationHeader
    {...props}
    right={
      <Button disabled={props.error} onPress={props.save}>
        Save
      </Button>
    }
  />
));

const validate = (input: string) => {
  return input.length < 3;
};

type ModalProps = StackScreenProps<
  StackRouteParamList,
  'AddModal' | 'EditModal'
>;

const Modal: React.FC<ModalProps> = props => {
  const {fieldById} = useFields();

  const id = props.route.params?.id;

  const initialText = id ? fieldById(id)?.text || '' : '';

  const [text, setText] = React.useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);
  const [error, setError] = useState(validate(text));

  const {colors} = useAppTheme();
  const dispatch = useAppDispatch();

  const saveField = useCallback(() => {
    if (id) {
      // we only have the id when we call edit but not on add
      dispatch(updateField({id, text}));
    } else {
      dispatch(addField(text));
    }
    props.navigation.goBack();
  }, [dispatch, text, id, props.navigation]);

  useEffect(() => {
    props.navigation.setOptions({
      header: headerProps => (
        <MemoizedHeader {...headerProps} error={error} save={saveField} />
      ),
    });
  }, [props.navigation, error, saveField]);

  return (
    <>
      <TextInput
        value={text}
        style={styles.textArea}
        label="Field Text"
        placeholder="Enter text..."
        multiline
        numberOfLines={5}
        maxLength={64}
        autoFocus
        error={error}
        onChangeText={input => {
          setText(input);
          setTextLength(input.length);
          setError(validate(input));
        }}
      />
      <View style={styles.indicatorBox}>
        <Text variant="labelMedium">{textLength} / 64</Text>
        {error && (
          <Text variant="labelMedium" style={{color: colors.error}}>
            Input too short
          </Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textArea: {
    margin: 5,
  },
  indicatorBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
  },
});

export default Modal;
