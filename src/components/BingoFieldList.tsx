import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import {useSnackbar} from '@/context/SnackbarContext';
import {useAppDispatch} from '@/hooks';
import {useModal} from '@/hooks/useModal';
import {FieldSection} from '@/models/sectionedFields';
import {AppScreenProps} from '@/navigation/types';
import {removeFields} from '@/stores/fieldsSlice';
import BingoFieldListItem from './BingoFieldListItem';
import {
  addSelectedField,
  removeSelectedField,
  setMultiselectMode,
  useSelectedFields,
} from '../stores/selectedFieldsSlice';

interface BingoFieldListProps {
  sections: FieldSection[];
  searchQuery: string;
}

const BingoFieldList: React.FC<BingoFieldListProps> = props => {
  const dispatch = useAppDispatch();
  const {openEditModal} = useModal();
  const {showSnackbar} = useSnackbar();
  const {selectedFields, multiSelectModeEnabled} = useSelectedFields();

  const shouldHide = (text: string) => {
    return !text.toLowerCase().includes(props.searchQuery.toLowerCase());
  };

  const deleteField = (id: number) => {
    dispatch(removeFields(id));
    showSnackbar('Field deleted!', true);
  };

  const enterMultiSelectMode = (id: number) => {
    if (!multiSelectModeEnabled) {
      // order matters, this way we don't see a 0 for a split second
      dispatch(addSelectedField(id));
      dispatch(setMultiselectMode(true));
    }
  };

  const selectField = (id: number) => {
    if (!multiSelectModeEnabled) {
      return;
    }
    if (selectedFields.includes(id)) {
      // we exit selection mode when we are about to deselect the last one.
      if (selectedFields.length === 1) {
        dispatch(setMultiselectMode(false));
      }
      dispatch(removeSelectedField(id));
      return;
    }
    dispatch(addSelectedField(id));
  };

  const isSelected = (id: number) => {
    return multiSelectModeEnabled && selectedFields.includes(id);
  };

  return (
    <SectionList
      sections={props.sections}
      ListFooterComponent={
        <Text style={styles.text} variant="labelMedium">
          {props.sections.flatMap(section => section.data).length} fields
        </Text>
      }
      ListFooterComponentStyle={styles.footer}
      renderSectionHeader={({section}) => (
        <List.Subheader>
          {section.title} ({section.data.length})
        </List.Subheader>
      )}
      renderSectionFooter={() => <Divider />}
      ItemSeparatorComponent={() => <Divider />}
      renderItem={({item}) => {
        return (
          <BingoFieldListItem
            key={item.id}
            style={shouldHide(item.text) ? styles.hide : {}}
            {...item}
            selected={isSelected(item.id)}
            edit={() => openEditModal(item.id)}
            delete={() => deleteField(item.id)}
            onPress={() => selectField(item.id)}
            onLongPress={() => enterMultiSelectMode(item.id)}
          />
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  hide: {
    display: 'none',
  },
  footer: {
    paddingVertical: 35,
  },
  text: {
    textAlign: 'center',
    paddingBottom: 15,
  },
});

export default BingoFieldList;
