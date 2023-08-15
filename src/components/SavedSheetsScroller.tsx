import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {Navigation, Pagination} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {useAppDispatch} from '@/hooks';
import {BingoSheet as BingoSheetModel} from '@/models/bingoSheet';
import {setSelectedSheet} from '@/stores/savedSheetsSlice';
import BingoSheet from './BingoSheet';

import 'swiper/swiper-bundle.min.css';
import './SavedSheetsScroller.css';
import {useAppTheme} from '@/stores/themeSlice';

interface WebSavedSheetsScrollerProps {
  savedSheets: BingoSheetModel[];
}

const WebSavedSheetsScroller: React.FC<WebSavedSheetsScrollerProps> = props => {
  const dispatch = useAppDispatch();
  const {primary} = useAppTheme().colors;

  return (
    <>
      {props.savedSheets.length > 0 ? (
        <Swiper
          style={{...styles.swiper, '--swiper-theme-color': primary}}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{clickable: true}}
          onSlideChange={swiper =>
            dispatch(
              setSelectedSheet(parseInt(swiper.slides[swiper.activeIndex].id)),
            )
          }
          onSwiper={swiper =>
            dispatch(setSelectedSheet(parseInt(swiper.slides[0].id)))
          }
          modules={[Navigation, Pagination]}>
          {props.savedSheets.map((item, index) => (
            <SwiperSlide
              style={styles.sheet}
              key={item.id}
              id={item.id.toString()}>
              <BingoSheet
                fields={item.fields}
                readonly
                style={{maxWidth: '100%'}}
              />
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
  swiper: {
    padding: 6,
    paddingBottom: 20,
    paddingTop: 20,
    // display: 'flex',
    // aspectRatio: 1,
    //make this not overflow
    maxWidth: 'calc(100% - 12px)',
  },

  sheet: {
    display: 'flex',
    justifyContent: 'center',
  },
});

export default WebSavedSheetsScroller;
