import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {useWindowDimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native-gesture-handler';

interface KafarohBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
  handlePresentModalPress: () => void;
  data: Data;
}

interface SectionItem {
  title: string;
  items: string[];
}

interface Data {
  [key: string]: SectionItem[];
}

const KafarohBottomSheet: React.FC<KafarohBottomSheetProps> = ({
  bottomSheetModalRef,
  handlePresentModalPress,
  data,
}) => {
  const {width} = useWindowDimensions();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const rotateAnims = useRef<{[key: string]: Animated.Value}>({}).current;
  const heightAnims = useRef<{[key: string]: Animated.Value}>({}).current;
  const prevDropdownRef = useRef<string | null>(null); // Ref to track previously opened dropdown

  useEffect(() => {
    // Initialize rotate and height animations for each item in data
    Object.keys(data).forEach(section => {
      data[section].forEach(item => {
        if (!rotateAnims[item.title]) {
          rotateAnims[item.title] = new Animated.Value(0);
        }
        if (!heightAnims[item.title]) {
          heightAnims[item.title] = new Animated.Value(0);
        }
      });
    });
  }, [data]); // Ensure animations are initialized on data change

  const toggleDropdown = (title: string) => {
    const isOpen = openDropdown === title;

    // Close previously opened dropdown
    if (prevDropdownRef.current && prevDropdownRef.current !== title) {
      Animated.parallel([
        Animated.timing(heightAnims[prevDropdownRef.current], {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(rotateAnims[prevDropdownRef.current], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Update the open dropdown and reset the previous one
    setOpenDropdown(isOpen ? null : title);
    prevDropdownRef.current = isOpen ? null : title;

    // Rotate the icon for the currently selected dropdown
    Animated.timing(rotateAnims[title], {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Animate height for the currently selected dropdown
    Animated.timing(heightAnims[title], {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const rotateInterpolate = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

  const heightInterpolate = (anim: Animated.Value) =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, hp('7%')],
    });

  return (
    <View style={{flex: 1}}>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={['25%', '50%', '70%']}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7}
            appearsOnIndex={1}
            disappearsOnIndex={-1}
          />
        )}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={{paddingBottom: hp('12%')}}>
            <View style={styles.header}>
              <Text style={[styles.headerText, {fontSize: wp('6.5%')}]}>
                Kafa
              </Text>
              <Text style={[styles.headerTextColored, {fontSize: wp('6.5%')}]}>
                roh
              </Text>
            </View>
            <View style={styles.content}>
              {Object.keys(data).map((section, secIndex) => (
                <View key={secIndex} style={{marginBottom: hp('3%')}}>
                  <Text style={[styles.contentText, {fontSize: wp('4.5%')}]}>
                    {section}
                  </Text>
                  {data[section].map((item, index) => (
                    <View key={index} style={styles.rowContainer}>
                      <TouchableOpacity
                        style={styles.rowTouchable}
                        onPress={() => toggleDropdown(item.title)}>
                        <View style={styles.rowContent}>
                          <View style={styles.circle}></View>
                          <Text style={[styles.rowText, {fontSize: wp('4%')}]}>
                            {item.title}
                          </Text>
                        </View>
                        <View>
                          <Animated.View
                            style={{
                              transform: [
                                {
                                  rotate: rotateAnims[item.title]
                                    ? rotateInterpolate(rotateAnims[item.title])
                                    : '0deg',
                                },
                              ],
                            }}>
                            <Ionicons
                              name="chevron-up-outline"
                              size={wp('5%')}
                              color="#13A89D"
                            />
                          </Animated.View>
                        </View>
                      </TouchableOpacity>
                      <Animated.View
                        style={[
                          styles.dropdown,
                          {
                            height: heightAnims[item.title]
                              ? heightInterpolate(heightAnims[item.title])
                              : 0,
                            opacity:
                              heightAnims[item.title]?.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 1],
                              }) || 0,
                          },
                        ]}>
                        {openDropdown === item.title && (
                          <>
                            {item.items.map((subItem, subIndex) => (
                              <Text
                                key={subIndex}
                                style={[
                                  styles.dropdownText,
                                  {fontSize: wp('3.5%')},
                                ]}>
                                {subIndex + 1}. {subItem}
                              </Text>
                            ))}
                          </>
                        )}
                      </Animated.View>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </BottomSheetModal>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#B8B8B8',
    borderBottomWidth: 1,
  },
  headerText: {
    color: '#000',
    fontFamily: 'Poppins-Bold',
  },
  headerTextColored: {
    color: '#13A89D',
    fontFamily: 'Poppins-Bold',
  },
  content: {
    padding: 10,
  },
  contentText: {
    color: '#000',
    fontFamily: 'Poppins-SemiBold',
  },
  rowContainer: {
    borderLeftColor: '#13A89D',
    borderLeftWidth: 5,
    alignItems: 'flex-start',
  },
  rowTouchable: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    justifyContent: 'space-between',
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    marginLeft: 10,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#13A89D',
    marginRight: 10,
  },
  rowText: {
    color: '#000',
    fontFamily: 'Poppins-Regular',
  },
  dropdown: {
    marginLeft: wp('10%'),
    overflow: 'hidden', // Ensure content does not spill out
  },
  dropdownText: {
    color: '#B8B8B8',
    fontSize: wp('3.5%'),
    fontFamily: 'Poppins-Regular',
  },
  scrollContent: {
    flexGrow: 1, // Allow ScrollView to grow and fill available space
  },
});

export default KafarohBottomSheet;
