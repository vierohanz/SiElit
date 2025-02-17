import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, ImageBackground} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const {width: screenWidth} = Dimensions.get('window');

interface Entry {
  illustration: any;
}

const entries: Entry[] = [
  {illustration: require('../assets/images/pekanolga.png')},
  {illustration: require('../assets/images/desainkelas.png')},
  {illustration: require('../assets/images/psb.png')},
];

const Parallax: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderItem = ({item}: {item: Entry}) => {
    return (
      <View>
        <ImageBackground
          source={item.illustration}
          style={styles.item}
          imageStyle={styles.image}></ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={screenWidth}
        height={hp('24%')}
        autoPlay={true}
        data={entries}
        scrollAnimationDuration={2000}
        renderItem={renderItem}
        mode="parallax"
        modeConfig={{
          parallaxScrollingOffset: 0,
          parallaxScrollingScale: 0.92,
        }}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      <View style={styles.indicatorContainer}>
        {entries.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  item: {
    elevation: 3,
    width: wp('100%'),
    height: hp('24%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 8,
    resizeMode: 'stretch',
    alignContent: 'flex-start',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: hp('25%'),
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 3,
  },
  activeIndicator: {
    backgroundColor: '#333',
  },
});

export default Parallax;
