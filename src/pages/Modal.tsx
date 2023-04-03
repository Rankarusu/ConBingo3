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
  const {fieldById} = useFields();
  const {fieldByPosition} = useCurrentSheet();
  const dispatch = useAppDispatch();

  const position = props.route.params?.position;
  const id = props.route.params?.id;

  //not the prettiest solution but it lets us reuse this component
  let title: string;
  let initialText: string;
  if (position !== undefined) {
    title = 'Edit Bingo Field';
    initialText = fieldByPosition(position)?.text;
  } else if (id !== undefined) {
    title = 'Edit Field';
    initialText = fieldById(id)?.text || '';
  } else {
    title = 'Add Field';
    initialText = '';
  }

  const [text, setText] = React.useState(initialText);
  const [textLength, setTextLength] = useState(initialText.length);
  const [error, setError] = useState(validate(text));

  const {colors} = useAppTheme();

  const saveField = useCallback(() => {
    if (position) {
      // we only have the id when we call edit but not on add
      dispatch(updateCurrentSheetField({position, text}));
    } else if (id) {
      dispatch(updateField({id, text}));
    } else {
      dispatch(addField(text));
    }
    props.navigation.goBack();
  }, [dispatch, text, id, position, props.navigation]);

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
