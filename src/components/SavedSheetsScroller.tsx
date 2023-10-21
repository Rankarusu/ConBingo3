import React, { RefObject } from 'react';

import { FlatList, StyleSheet } from 'react-native';

import { Text } from 'react-native-paper';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import BingoSheet from '@/components/BingoSheet';
import { useAppDispatch } from '@/hooks';
import { BingoSheet as BingoSheetModel } from '@/models/bingoSheet';
import { setSelectedSheet } from '@/stores/savedSheetsSlice';
import { useAppTheme } from '@/stores/themeSlice';

import 'swiper/swiper-bundle.min.css';
import '@/components/SavedSheetsScroller.css';

interface WebSavedSheetsScrollerProps {
  savedSheets: BingoSheetModel[];
  flatRef?: RefObject<FlatList>;
}

const WebSavedSheetsScroller: React.FC<WebSavedSheetsScrollerProps> = (
  props,
) => {
  const dispatch = useAppDispatch();
  const { primary } = useAppTheme().colors;

  return (
    <>
      {props.savedSheets.length > 0 ? (
        <Swiper
          style={{ '--swiper-theme-color': primary } as React.CSSProperties}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          onSlideChange={(swiper) =>
            dispatch(
              setSelectedSheet(parseInt(swiper.slides[swiper.activeIndex].id)),
            )
          }
          // so deletions in a row work properly
          onSlidesLengthChange={(swiper) =>
            dispatch(
              setSelectedSheet(parseInt(swiper.slides[swiper.activeIndex].id)),
            )
          }
          onSwiper={(swiper) =>
            dispatch(setSelectedSheet(parseInt(swiper.slides[0]?.id ?? 0)))
          }
          modules={[Navigation, Pagination]}
        >
          {props.savedSheets.map((item) => (
            <SwiperSlide
              style={styles.slide}
              key={item.id}
              id={item.id.toString()}
            >
              <BingoSheet fields={item.fields} readonly style={styles.sheet} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Text>You have no sheets saved at the moment.</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  slide: { display: 'flex', justifyContent: 'center' },
  sheet: { maxWidth: '100%' },
});

export default WebSavedSheetsScroller;
