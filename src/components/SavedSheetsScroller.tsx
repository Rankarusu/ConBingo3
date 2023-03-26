import React from 'react';
import {Animated, Dimensions, FlatList, StyleSheet, View} from 'react-native';
import {ScalingDot} from 'react-native-animated-pagination-dots';
import BingoSheet from '../components/BingoSheet';
import {useAppTheme} from '../hooks/useAppTheme';
import {BingoSheet as BingoSheetModel} from '../models/bingoSheet';

const width = Dimensions.get('window').width; //TODO: read these once and export const

interface SavedSheetsScrollerProps {
  savedSheets: BingoSheetModel[];
}

const SavedSheetsScroller = (props: SavedSheetsScrollerProps) => {
  const {primary} = useAppTheme().colors;

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View>
      <FlatList
        data={props.savedSheets}
        style={styles.swiper}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment={'center'}
        snapToInterval={width}
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        pagingEnabled
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
