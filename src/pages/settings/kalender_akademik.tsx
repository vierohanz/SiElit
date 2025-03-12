import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import appSettings from '../../../Appsettings';

interface CalendarItem {
  time: string;
  title: string;
  location: string | null;
  type: string;
  color: string;
}

interface CalendarItems {
  [key: string]: CalendarItem[];
}

const Kalender_Akademik: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [items, setItems] = useState<CalendarItems>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendarItems = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (!token) {
          console.error('Access token not found');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${appSettings.api}/calendars`, {
          headers: {Authorization: `Bearer ${token}`},
        });

        if (response.data && response.data.data) {
          setItems(response.data.data);
        } else {
          console.error('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarItems();
  }, []);

  const renderItem = (item: CalendarItem) => (
    <TouchableOpacity style={styles.item}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.2)"
        translucent={true}
      />
      <View style={styles.itemHeader}>
        <Text style={styles.itemTime}>{item.time}</Text>
        <View style={[styles.itemType, {backgroundColor: item.color}]}>
          <Text style={styles.itemTypeText}>{item.type}</Text>
        </View>
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
      {item.location && (
        <Text style={styles.itemLocation}>Tempat: {item.location}</Text>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 20}}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          paddingHorizontal: 10,
          height: hp('4.5%'),
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp('7%'),
          marginBottom: 12,
        }}>
        <TouchableOpacity
          style={{height: hp('4%'), width: wp('5%')}}
          onPress={() => navigation.navigate('Index')}>
          <Ionicons name="chevron-back-outline" size={25} color="black" />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: '#13A89D',
              fontSize: wp('5.5%'),
            }}>
            Kalender{' '}
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              color: '#000',
              fontSize: wp('5.5%'),
            }}>
            Akademik
          </Text>
        </View>
        <View style={{height: 1, width: 1}}></View>
      </View>
      <Agenda
        items={items}
        renderItem={renderItem}
        theme={{
          agendaDayTextColor: '#000',
          agendaDayNumColor: '#000',
          agendaTodayColor: '#13A89D',
          agendaKnobColor: '#13A89D',
          backgroundColor: '#F9F9F9',
          calendarBackground: '#F9F9F9',
          selectedDayBackgroundColor: '#13A89D',
          dotColor: '#13A89D',
          selectedDotColor: '#FFFFFF',
          textSectionTitleColor: '#000',
          textSectionTitleDisabledColor: '#A5A5A5',
        }}
        style={styles.agenda}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  agenda: {
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
    elevation: 5,
  },
  item: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    borderRadius: 8,
    padding: 15,
    marginRight: 20,
    marginTop: 17,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemTime: {
    fontSize: 14,
    color: '#555',
    fontFamily: 'Poppins-Regular',
  },
  itemType: {
    borderRadius: 20,
    padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 35,
  },
  itemTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    color: '#333',
  },
  itemLocation: {
    fontSize: 14,
    color: '#777',
    fontFamily: 'Poppins-Regular',
  },
});

export default Kalender_Akademik;
