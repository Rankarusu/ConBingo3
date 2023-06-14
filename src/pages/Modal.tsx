/* eslint-disable react/no-unstable-nested-components */
// /* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import RootNavigationHeader, {
  RootNavigationHeaderProps,
} from '../components/RootNavigationHeader';
import {useAppDispatch, useAppTheme} from '../hooks';
import {addField, updateField, useFields} from '../stores/fieldsSlice';
import {RootScreenProps} from '../navigation/types';
import {
  updateCurrentSheetField,
  useCurrentSheet,
} from '../stores/currentSheetSlice';

export enum ModalMode {
  ADD = 'Add Field',
  EDIT = 'Edit Field',
  EDIT_CURRENT_SHEET = 'Edit Bingo Field',
}

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

const Modal: React.FC<RootScreenProps<'Modal'>> = props => {
  const dispatch = useAppDispatch();
  const {fieldByPosition} = useCurrentSheet();
  const {fieldById} = useFields();
  const {colors} = useAppTheme();

  const {mode} = props.route.params;

  const title = mode;
  let initialText = '';
  let saveFn: (text: string) => void;

  switch (mode) {
    case ModalMode.EDIT_CURRENT_SHEET:
      const {position} = props.route.params;
      initialText = fieldByPosition(position).text;
      saveFn = (text: string) =>
        dispatch(updateCurrentSheetField({position, text}));
      break;
    case ModalMode.EDIT:
      const {id} = props.route.params;
      initialText = initialText = fieldById(id)?.text || '';
      saveFn = (text: string) => dispatch(updateField({id, text}));
      break;
    case ModalMode.ADD:
      saveFn = (text: string) => dispatch(addField(text));
      break;
  }

  const [text, setText] = React.useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);
  const [error, setError] = useState(validate(text));

  const saveField = useCallback(() => {
    saveFn(text);
    props.navigation.goBack();
  }, [saveFn, props.navigation, text]);

  useEffect(() => {
    props.navigation.setOptions({
      header: headerProps => (
        <MemoizedHeader
          {...headerProps}
          title={title}
          error={error}
          save={saveField}
        />
      ),
    });
  }, [props.navigation, error, title, saveField]);

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
