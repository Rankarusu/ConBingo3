/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, FAB, Searchbar, useTheme} from 'react-native-paper';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import BingoFieldList from '../components/BingoFieldList';
import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '../components/DrawerNavigationHeader';
import {AlertOptions, useAlert} from '../context/AlertContext';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {AppScreenProps} from '../navigation/types';
import {
  addFields,
  removeFields,
  resetFields,
  useFields,
} from '../stores/fieldsSlice';
import {loadFieldsFromFile, share} from '../utils/io';
import {Logger} from '../utils/logger';
import {
  resetSelectedFields,
  setMultiselectMode,
  useSelectedFields,
} from '../stores/selectedFieldsSlice';

const FADE_DURATION = 300;

type MemoizedHeaderProps = DrawerNavigationHeaderProps & {
  resetFields: () => void;
  importFields: () => void;
};

const MemoizedHeader = memo((props: MemoizedHeaderProps) => {
  return (
    <Animated.View //we animate this so we can have a nice transition when going into multiselect mode
      exiting={FadeOut.duration(FADE_DURATION)}>
      <DrawerNavigationHeader
        {...props}
        right={
          <>
            <Appbar.Action icon="import" onPress={props.importFields} />
            <Appbar.Action icon="bomb" onPress={props.resetFields} />
          </>
        }
      />
    </Animated.View>
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
    <Animated.View
      entering={FadeIn.duration(FADE_DURATION)}
      exiting={FadeOut.duration(FADE_DURATION)}>
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
    </Animated.View>
  );
};

const EditFields: React.FC<AppScreenProps<'EditFields'>> = props => {
  const dispatch = useAppDispatch();
  const {fields, sectionedFields} = useFields();
  const {selectedFields, multiSelectModeEnabled} = useSelectedFields();
  const {openAddModal} = useModal();
  const {showAlert} = useAlert();
  const {showSnackbar} = useSnackbar();

  const [searchQuery, setSearchQuery] = React.useState('');

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

  const confirmAndDeleteFields = useCallback(() => {
    const amount = selectedFields.length;
    const alertOptions: AlertOptions = {
      title: 'Delete Fields',
      content: `You are about to delete ${amount} fields. \n Are you sure?`,
      confirmAction: () => {
        dispatch(removeFields(selectedFields));
        dispatch(setMultiselectMode(false));
        dispatch(resetSelectedFields());
        showSnackbar(`Deleted ${amount} fields.`, true);
      },
    };
    showAlert(alertOptions);
  }, [dispatch, showAlert, showSnackbar, selectedFields]);

  const importFields = async () => {
    let importedFields;
    try {
      importedFields = await loadFieldsFromFile();
    } catch (error) {
      if (error instanceof Error) {
        showSnackbar(error.message, true);
        Logger.error(error.message);
        return;
      }
    }
    if (!importedFields) {
      return;
    }
    const fieldTexts = fields.map(field => field.text);
    const deduplicatedFields = importedFields.filter(
      field => !fieldTexts.includes(field),
    );
    if (deduplicatedFields.length > 0) {
      dispatch(addFields(deduplicatedFields));
      showSnackbar(
        `${deduplicatedFields.length} Fields imported successfully!`,
        true,
      );
    } else {
      showSnackbar('Nothing to import!', true);
    }
  };

  const shareFields = async () => {
    const fieldsToLoad = fields
      .filter(field => selectedFields.includes(field.id))
      .map(field => field.text);
    if (!fieldsToLoad) {
      showSnackbar('Something went wrong while sharing fields.', true);
      Logger.error('tried to share empty fields.');
      return;
    }
    await share(fieldsToLoad, 'bingo-fields.txt');
  };

  useEffect(() => {
    if (multiSelectModeEnabled) {
      props.navigation.setOptions({
        header: headerProps => (
          <MultiSelectModeHeader
            {...(headerProps as DrawerNavigationHeaderProps)}
            title={`${selectedFields.length} Fields selected`}
            cancelMode={() => {
              dispatch(setMultiselectMode(false));
              dispatch(resetSelectedFields());
            }}
            deleteFields={confirmAndDeleteFields}
            shareFields={shareFields}
          />
        ),
      });
    } else {
      props.navigation.setOptions({
        header: headerProps => (
          <MemoizedHeader
            {...(headerProps as DrawerNavigationHeaderProps)}
            title={'Edit Fields'}
            importFields={importFields}
            resetFields={confirmAndReset}
          />
        ),
      });
    }
  }, [
    props.navigation,
    confirmAndReset,
    multiSelectModeEnabled,
    selectedFields,
  ]);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
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
