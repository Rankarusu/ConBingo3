import React, { RefObject, useCallback, useRef } from 'react';

import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewToken,
  ViewabilityConfig,
} from 'react-native';

import { ScalingDot } from 'react-native-animated-pagination-dots';
import { Text } from 'react-native-paper';

import BingoSheet from '@/components/BingoSheet';
import { useAppDispatch } from '@/hooks';
import { BingoSheet as BingoSheetModel } from '@/models/bingoSheet';
import { setSelectedSheet } from '@/stores/savedSheetsSlice';
import { useAppTheme } from '@/stores/themeSlice';

interface SavedSheetsScrollerProps {
  savedSheets: BingoSheetModel[];
  flatRef: RefObject<FlatList>;
}

const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  waitForInteraction: false,
};

const SavedSheetsScroller: React.FC<SavedSheetsScrollerProps> = (props) => {
  const { width } = Dimensions.get('window');
  const dispatch = useAppDispatch();

  const { primary } = useAppTheme().colors;
  const scrollX = useRef(new Animated.Value(0)).current;

  // using useCallback to circumvent "changing onViewableItemsChanged on the fly is not supported"-error
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const currentId = viewableItems[0]?.item?.id;
      console.log(viewableItems);
      if (currentId !== undefined) {
        /* because we keep our screens mounted and the viewable items change upon
        navigating, we only want to dispatch if something is visible */
        dispatch(setSelectedSheet(currentId));
      }
    },
    [dispatch],
  );

  return (
    <View>
      <FlatList
        ref={props.flatRef}
        data={props.savedSheets}
        style={{ maxHeight: width + 6 }}
        horizontal
        initialNumToRender={1}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        ListEmptyComponent={
          <Text>You have no sheets saved at the moment.</Text>
        }
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        snapToInterval={width}
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({
          item,
          index,
        }: {
          item: BingoSheetModel;
          index: number;
        }) => (
          <View style={{ height: width, width: width }}>
            <BingoSheet fields={item.fields} key={index} readonly />
          </View>
        )}
      />
      <ScalingDot
        data={props.savedSheets}
        scrollX={scrollX}
        dotStyle={styles.dot}
        activeDotColor={primary}
        inActiveDotColor={primary}
        inActiveDotOpacity={0.6}
        containerStyle={styles.paginationContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },

  paginationContainer: {
    bottom: -10,
  },
});

export default SavedSheetsScroller;
