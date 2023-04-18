/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import RootNavigationHeader, {
  RootNavigationHeaderProps,
} from '../components/RootNavigationHeader';
import {useAppDispatch, useAppTheme} from '../hooks';
import {RootScreenProps} from '../navigation/types';
import {
  updateCurrentSheetField,
  useCurrentSheet,
} from '../stores/currentSheetSlice';
import {addField, updateField, useFields} from '../stores/fieldsSlice';
import {Logger} from '../utils/logger';

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
  const {currentSheet, fieldByPosition} = useCurrentSheet();
  const {fields, fieldById} = useFields();
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
    saveFn(text.trim());
    props.navigation.goBack();
  }, [saveFn, props.navigation, text]);

  const rerollField = () => {
    //only get fields that we do not already have in the sheet
    const filteredFields = fields.filter(
      field => !currentSheet.find(cField => cField.text === field.text),
    );

    const randomField =
      filteredFields[Math.floor(Math.random() * filteredFields.length)];

    setText(randomField?.text || '');
    Logger.debug('field rerolled');
  };

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
    <View style={styles.wrapper}>
      <TextInput
        value={text}
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
      {mode === ModalMode.EDIT_CURRENT_SHEET && (
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          disabled={fields.length < 25}
          onPress={rerollField}>
          {fields.length < 25 ? 'Not enough fields to reroll' : 'Reroll'}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 5,
  },
  indicatorBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginHorizontal: 20,
  },
  button: {
    // flex: 1,
    marginVertical: 10,
  },
});

export default Modal;
