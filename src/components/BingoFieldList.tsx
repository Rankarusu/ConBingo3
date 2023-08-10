import React from 'react';
import {SectionList, StyleSheet} from 'react-native';
import {Divider, List, Text} from 'react-native-paper';
import {useSnackbar} from '../context/SnackbarContext';
import {useAppDispatch} from '../hooks';
import {useModal} from '../hooks/useModal';
import {FieldSection} from '../models/sectionedFields';
import {AppScreenProps} from '../navigation/types';
import {removeField} from '../stores/fieldsSlice';
import BingoFieldListItem from './BingoFieldListItem';

interface BingoFieldListProps {
  sections: FieldSection[];
  searchQuery: string;
  navigation: AppScreenProps<'EditFields'>['navigation'];
}

const BingoFieldList: React.FC<BingoFieldListProps> = props => {
  const dispatch = useAppDispatch();
  const {openEditModal} = useModal();
  const {showSnackbar} = useSnackbar();

  const shouldHide = (text: string) => {
    return !text.toLowerCase().includes(props.searchQuery.toLowerCase());
  };

  const deleteField = (id: number) => {
    dispatch(removeField(id));
    showSnackbar('Field deleted!', true);
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
      renderItem={({item}) => {
        return (
          <BingoFieldListItem
            style={shouldHide(item.text) ? styles.hide : {}}
            {...item}
            edit={() => openEditModal(item.id)}
            delete={() => deleteField(item.id)}
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
