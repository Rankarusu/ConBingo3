import React, { memo, useCallback, useEffect, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Button, HelperText, TextInput } from 'react-native-paper';

import RootNavigationHeader, {
  RootNavigationHeaderProps,
} from '@/components/RootNavigationHeader';
import { useSnackbar } from '@/context/SnackbarContext';
import { useAppDispatch } from '@/hooks';
import { RootScreenProps } from '@/navigation/types';
import {
  updateCurrentSheetField,
  useCurrentSheet,
} from '@/stores/currentSheetSlice';
import { addField, updateField, useFields } from '@/stores/fieldsSlice';
import { Logger } from '@/utils/logger';
import { normalizeString, normalizeWhitespace } from '@/utils/text';

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
  return normalizeWhitespace(input).length < 3;
};

const Modal: React.FC<RootScreenProps<'modal'>> = () => {
  const dispatch = useAppDispatch();
  const { currentSheet, fieldByPosition } = useCurrentSheet();
  const { fields, fieldById } = useFields();
  const { showSnackbar } = useSnackbar();
  const navigation = useNavigation();

  const params = useLocalSearchParams<{
    id: string;
    position: string;
    mode: string;
  }>();

  const { mode } = params;
  const title = mode;
  let initialText = '';
  let saveFn: (text: string) => void;
  let duplicateCheckFn: (text: string) => boolean;

  const isDuplicateField = (field: string, id: number | null) => {
    // we use null as an id when adding a new field
    const filteredFields =
      id === null
        ? fields
        : fields.filter((reduxField) => reduxField.id !== id);
    const fieldTexts = filteredFields.map((reduxField) =>
      normalizeString(reduxField.text),
    );
    return fieldTexts.includes(normalizeString(field));
  };

  const isDuplicateCurrentSheetField = (field: string, position: number) => {
    const fieldTexts = currentSheet
      .filter((reduxField) => reduxField.position !== position)
      .map((reduxField) => normalizeString(reduxField.text));
    return fieldTexts.includes(normalizeString(field));
  };

  switch (mode) {
    case ModalMode.EDIT_CURRENT_SHEET:
      const { position: positionStr } = params;
      const position = parseInt(positionStr ?? '');
      initialText = fieldByPosition(position).text;
      saveFn = (text: string) =>
        dispatch(updateCurrentSheetField({ position, text }));
      duplicateCheckFn = (text) => isDuplicateCurrentSheetField(text, position);
      break;

    case ModalMode.EDIT:
      const { id: idStr } = params;
      const id = parseInt(idStr ?? '');
      initialText = fieldById(id)?.text ?? '';
      saveFn = (text: string) =>
        dispatch(updateField({ id, text, isCustom: true }));
      duplicateCheckFn = (text) => isDuplicateField(text, id);
      break;

    case ModalMode.ADD:
      saveFn = (text: string) => dispatch(addField({ text, isCustom: true }));
      duplicateCheckFn = (text) => isDuplicateField(text, null);
      break;
  }

  const [text, setText] = useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);
  const [error, setError] = useState(validate(text));

  const saveField = useCallback(() => {
    if (duplicateCheckFn(text)) {
      showSnackbar('You already have a field with the same content');
    } else {
      saveFn(normalizeWhitespace(text));
      navigation.goBack();
    }
  }, [duplicateCheckFn, text, showSnackbar, saveFn, navigation]);

  const rerollField = () => {
    //only get fields that we do not already have in the sheet
    const filteredFields = fields.filter(
      (field) => !currentSheet.find((cField) => cField.text === field.text),
    );

    const randomField =
      filteredFields[Math.floor(Math.random() * filteredFields.length)];

    setText(randomField?.text || '');
    Logger.debug('field rerolled');
  };

  useEffect(() => {
    navigation.setOptions({
      header: (headerProps: MemoizedHeaderProps) => (
        <MemoizedHeader
          {...headerProps}
          title={title}
          error={error}
          save={saveField}
        />
      ),
    });
  }, [navigation, error, title, saveField]);

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
        onChangeText={(input) => {
          setText(input);
          setTextLength(normalizeWhitespace(input).length);
          setError(validate(input));
        }}
      />
      <View style={styles.indicatorBox}>
        <HelperText type="error" visible={validate(text)}>
          Input too short!
        </HelperText>
        <HelperText type="info">{textLength} / 64</HelperText>
      </View>
      {mode === ModalMode.EDIT_CURRENT_SHEET && (
        <Button
          style={styles.button}
          icon="reload"
          mode="contained"
          disabled={fields.length < 25}
          onPress={rerollField}
        >
          {fields.length < 25 ? 'Not enough fields to reroll' : 'Reroll'}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 5,
    marginHorizontal: 'auto',
    width: '100%',
    maxWidth: 1200,
  },
  indicatorBox: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    marginVertical: 10,
  },
});

export default Modal;
