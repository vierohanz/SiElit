import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import CardPresensi from '../components/CardPresensi';
import Searching from '../components/Searching';
import HorizontalList from '../components/HorizontalList';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data1 = [
  {
    id: '1',
    title: 'Semua',
  },
  {
    id: '2',
    title: 'Hari Ini',
  },
];

type PresensiItem = {
  id: string;
  day: string;
  time: string;
  title: string;
  timeRange: string;
  status: string;
  updateTime: string;
  date: string;
};

const data: PresensiItem[] = [
  {
    id: '1',
    day: 'Sen',
    time: '18:30',
    title: 'Mengaji Lambatan',
    timeRange: '19:30 - 21:30',
    status: 'Hadir',
    updateTime: '19:20',
    date: '2024-07-21', // Format ISO 8601 date
  },
  {
    id: '2',
    day: 'Sel',
    time: '09:00',
    title: 'Diskusi Kelompok',
    timeRange: '09:00 - 11:00',
    status: 'Absen',
    updateTime: '09:10',
    date: '2024-07-22', // Format ISO 8601 date
  },
  {
    id: '3',
    day: 'Sel',
    time: '09:00',
    title: 'Diskusi Kelompok',
    timeRange: '09:00 - 11:00',
    status: 'Absen',
    updateTime: '09:10',
    date: '2024-07-14', // Format ISO 8601 date
  },
];

const Presensi: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string | null>('1'); // Default selected filter 'Semua'
  const [searchText, setSearchText] = useState<string>(''); // State untuk nilai pencarian

  const handleFilterSelect = (filterId: string) => {
    setSelectedFilter(filterId);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const renderItem = ({item}: {item: PresensiItem}) => (
    <CardPresensi
      day={item.day}
      time={item.time}
      title={item.title}
      timeRange={item.timeRange}
      status={item.status}
      updateTime={item.updateTime}
      date={item.date}
    />
  );

  let filteredData = data;

  // Filter berdasarkan selectedFilter
  if (selectedFilter === '2') {
    const todayDate = new Date().toISOString().split('T')[0];
    filteredData = data.filter(item => item.date === todayDate);
  }

  // Filter berdasarkan searchText
  filteredData = filteredData.filter(
    item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.day.toLowerCase().includes(searchText.toLowerCase()) ||
      item.status.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderCard = (item: {id: string; title: string}) => (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.contentContainer}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Presensi</Text>
        <Searching onSearch={handleSearch} />
      </View>
      <HorizontalList
        data={data1}
        onSelect={handleFilterSelect}
        selectedId={selectedFilter}
        renderCard={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#13A89D',
    height: hp('20%'),
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerText: {
    fontSize: wp('6%'),
    fontWeight: '700',
    color: '#fff',
  },
  contentContainer: {
    marginTop: 10,
    paddingHorizontal: wp('1.5%'),
  },
});

export default Presensi;
