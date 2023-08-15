/* eslint-disable react/no-unstable-nested-components */
import React, {memo, useCallback, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Appbar, FAB, Searchbar} from 'react-native-paper';
import BingoFieldList from '@/components/BingoFieldList';
import DrawerNavigationHeader, {
  DrawerNavigationHeaderProps,
} from '@/components/DrawerNavigationHeader';
import {AlertOptions, useAlert} from '@/context/AlertContext';
import {useSnackbar} from '@/context/SnackbarContext';
import {useAppDispatch} from '@/hooks';
import {useModal} from '@/hooks/useModal';
import {AppScreenProps} from '@/navigation/types';
import {
  addFields,
  removeFields,
  resetFields,
  useFields,
} from '@/stores/fieldsSlice';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useAppTheme} from '@/stores/themeSlice';
import {
  resetSelectedFields,
  setMultiselectMode,
  useSelectedFields,
} from '@/stores/selectedFieldsSlice';
import {exportedFieldsRegex, loadAndValidate, share} from '@/utils/io';
import {Logger} from '@/utils/logger';
import {useNavigation} from 'expo-router';

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
  const theme = useAppTheme();
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

const EditFields: React.FC<AppScreenProps<'edit-fields'>> = props => {
  const dispatch = useAppDispatch();
  const {fields, sectionedFields} = useFields();
  const {selectedFields, multiSelectModeEnabled} = useSelectedFields();
  const {openAddModal} = useModal();
  const {showAlert} = useAlert();
  const {showSnackbar} = useSnackbar();
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = React.useState('');

  // add our reset button to the header
  const confirmAndResetFields = useCallback(() => {
    const alertOptions: AlertOptions = {
      title: 'Reset Fields',
      content:
        'This will discard all your added and edited fields and load the default set.\n\nAre you sure?',
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
      importedFields = await loadAndValidate<string[]>(exportedFieldsRegex);
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
      navigation.setOptions({
        header: (headerProps: DrawerNavigationHeaderProps) => (
          <MultiSelectModeHeader
            {...headerProps}
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
      navigation.setOptions({
        header: (headerProps: DrawerNavigationHeaderProps) => (
          <MemoizedHeader
            {...headerProps}
            title={'Edit Fields'}
            importFields={importFields}
            resetFields={confirmAndResetFields}
          />
        ),
      });
    }
  }, [
    navigation,
    confirmAndResetFields,
    multiSelectModeEnabled,
    selectedFields,
  ]);
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <View style={styles.wrapper}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        elevation={1}
        style={styles.searchBar}
      />
      <BingoFieldList sections={sectionedFields} searchQuery={searchQuery} />
      <FAB icon="plus" style={styles.fab} onPress={openAddModal} />
    </View>
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
  wrapper: {
    flex: 1,
  },
});

export default EditFields;
