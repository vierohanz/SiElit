import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface HorizontalListProps {
  data: {id: string; title: string}[];
  onSelect: (filterId: string) => void;
  selectedId: string | null;
  renderCard: (item: {id: string; title: string}) => JSX.Element;
}

const HorizontalList: React.FC<HorizontalListProps> = ({
  data,
  onSelect,
  selectedId,
  renderCard,
}) => {
  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <TouchableOpacity
      style={[
        styles.button,
        selectedId === item.id ? styles.selectedButton : {},
      ]}
      onPress={() => onSelect(item.id)}>
      <Text
        style={[
          styles.buttonText,
          selectedId === item.id ? {color: '#fff'} : {},
        ]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {renderCard(data.find(item => item.id === selectedId) || data[0])}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('6%'),
    paddingHorizontal: wp('1%'),
  },
  button: {
    paddingHorizontal: wp('6%'),
    paddingVertical: hp('1%'),
    borderRadius: 15,
    marginBottom: hp('2%'),
    backgroundColor: '#fff',
    borderColor: '#13A89D',
    borderWidth: 2,
    marginHorizontal: wp('1.5%'),
  },
  selectedButton: {
    backgroundColor: '#13A89D',
    color: '#fff',
  },
  buttonText: {
    color: '#000',
    fontSize: wp('4%'),
    fontWeight: '500',
  },
});

export default HorizontalList;
