/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, FAB, Searchbar, useTheme} from 'react-native-paper';
import BingoFieldList from '../components/BingoFieldList';
import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '../components/DrawerNavigationHeader';
import {AlertOptions, useAlert} from '../context/AlertContext';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {BingoField} from '../models/bingoField';
import {AppScreenProps} from '../navigation/types';
import {addFields, resetFields, useFields} from '../stores/fieldsSlice';
import {loadFieldsFromFile} from '../utils/io';
import {Logger} from '../utils/logger';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const FADE_DURATION = 500;

type MemoizedHeaderProps = DrawerNavigationHeaderProps & {
  resetFields: () => void;
  importFields: () => void;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => {
  return (
    <DrawerNavigationHeader
      {...props}
      right={
        <>
          <Appbar.Action icon="import" onPress={props.importFields} />
          <Appbar.Action icon="bomb" onPress={props.resetFields} />
        </>
      }
    />
  );
});

type MultiSelectModeHeaderProps = {
  title: string;
  cancelMode: () => void;
  deleteFields: () => void;
  shareFields: () => void;
};

const MultiSelectModeHeader = (props: MultiSelectModeHeaderProps) => {
  const theme = useTheme();
  return (
    <Appbar.Header
      style={{
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 2,
      }}>
      <Appbar.BackAction onPress={props.cancelMode} />
      <Appbar.Content title={props.title} style={styles.title} />
      <Appbar.Action icon="share-variant" onPress={props.shareFields} />
      <Appbar.Action icon="delete" onPress={props.deleteFields} />
    </Appbar.Header>
  );
};

const EditFields: React.FC<AppScreenProps<'EditFields'>> = props => {
  const dispatch = useAppDispatch();
  const {fields, sectionedFields} = useFields();
  const {openAddModal} = useModal();
  const {showAlert} = useAlert();
  const {showSnackbar} = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState('');

  //this is best put into redux so we can change the tap action from withing the list item
  const [multiselectMode, setMultiselectMode] = useState<boolean>(true);

  const [selectedFields, setSelectedFields] = useState<BingoField[]>([]);

  // add our reset button to the header
  const confirmAndReset = useCallback(() => {
    const alertOptions: AlertOptions = {
      title: 'Reset Fields',
      content:
        'This will discard all your added and edited fields and load the default set.\n Are you sure?',
      confirmAction: () => {
        dispatch(resetFields());
        showSnackbar('Fields have been reset.', true);
      },
    };
    showAlert(alertOptions);
  }, [dispatch, showAlert, showSnackbar]);

  const importFields = async () => {
    let importedFields;
    try {
      importedFields = await loadFieldsFromFile();
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message);
        Logger.error(error.message);
        return;
      }
    }
    if (!importedFields) {
      return;
    }
    const deduplicatedFields = importedFields.filter(
      field => !fields.map(field => field.text).includes(field),
    );
    if (deduplicatedFields.length > 0) {
      dispatch(addFields(deduplicatedFields));
      showSnackbar(`${fields.length} Fields imported successfully!`);
    } else {
      showSnackbar('Nothing to import!');
    }
  };

  useEffect(() => {
    Logger.debug('rendered Header');
    if (multiselectMode) {
      props.navigation.setOptions({
        header: headerProps => (
          <Animated.View
            entering={FadeIn.duration(FADE_DURATION)}
            exiting={FadeOut.duration(FADE_DURATION)}>
            <MultiSelectModeHeader
              {...(headerProps as DrawerNavigationHeaderProps)}
              title={`${selectedFields.length} Fields selected`}
              cancelMode={() => {
                setMultiselectMode(false);
                setSelectedFields([]);
              }}
              deleteFields={() => {}}
              shareFields={() => {}}
            />
          </Animated.View>
        ),
      });
    } else {
      props.navigation.setOptions({
        header: headerProps => (
          <Animated.View //we animate this so we can have a nice transition when going into multiselect mode
            exiting={FadeOut.duration(FADE_DURATION)}>
            <MemoizedHeader
              {...(headerProps as DrawerNavigationHeaderProps)}
              title={'Edit Fields'}
              importFields={importFields}
              resetFields={confirmAndReset}
            />
          </Animated.View>
        ),
      });
      // }
      // return () => {
      //   setMultiselectMode(false);
      //   setSelectedFields([]);
    }
  }, [props.navigation, confirmAndReset, multiselectMode, selectedFields]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  const onMultiselectMode = () => {
    setMultiselectMode(true);
  };

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        elevation={1}
        style={styles.searchBar}
      />
      <BingoFieldList
        sections={sectionedFields}
        searchQuery={searchQuery}
        navigation={props.navigation}
        onMultiselectMode={onMultiselectMode}
      />
      <FAB icon="plus" style={styles.fab} onPress={openAddModal} />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 0,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },

  title: {
    paddingStart: 5,
  },
});

export default EditFields;
