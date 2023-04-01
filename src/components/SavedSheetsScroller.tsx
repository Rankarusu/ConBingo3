import React, {RefObject, useCallback} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  ViewabilityConfig,
  ViewToken,
} from 'react-native';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import {Text} from 'react-native-paper';
import BingoSheet from '../components/BingoSheet';
import {useAppDispatch} from '../hooks';
import {useAppTheme} from '../hooks/useAppTheme';
import {BingoSheet as BingoSheetModel} from '../models/bingoSheet';
import {setIndex} from '../stores/savedSheetsSlice';

const width = Dimensions.get('window').width; //TODO: read these once and export const

interface SavedSheetsScrollerProps {
  savedSheets: BingoSheetModel[];
  flatRef: RefObject<FlatList>;
}

const viewabilityConfig: ViewabilityConfig = {
  itemVisiblePercentThreshold: 50,
  waitForInteraction: false,
};

const SavedSheetsScroller = (props: SavedSheetsScrollerProps) => {
  const dispatch = useAppDispatch();

  const {primary} = useAppTheme().colors;
  const scrollX = React.useRef(new Animated.Value(0)).current;

  //using useCallback to circumvent "changing onViewableItemsChanged on the fly is not supported"-error
  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      console.log(viewableItems[0].item.id);
      dispatch(setIndex(viewableItems[0].item.id || 0));
    },
    [dispatch],
  );

  return (
    <View>
      <FlatList
        ref={props.flatRef}
        data={props.savedSheets}
        style={styles.swiper}
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
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
        renderItem={({item, index}) => (
          <View style={styles.sheet}>
            <BingoSheet fields={item.content} key={index} readonly />
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

export default SavedSheetsScroller;

const styles = StyleSheet.create({
  swiper: {
    padding: 6,
    maxHeight: width + 6,
  },

  sheet: {
    width: width,
    height: width,
  },

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
