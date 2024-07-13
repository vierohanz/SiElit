import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Table, Row, TableWrapper} from 'react-native-table-component';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const TableJadwal: React.FC = () => {
  // Define the table headers
  const tableHead: string[] = ['Hari', 'Ruang', 'Mulai', 'Selesai'];

  // Define the table data
  const tableData: string[][] = [
    ['Senin', 'GSG', '05:00', '06:00'],
    ['Senin', 'Astra II', '19:30', '21:30'],
    ['Selasa', 'GSG', '05:00', '06:00'],
    ['Selasa', 'GSG', '19:30', '21:30'],
    ['Rabu', 'GSG', '19:30', '21:30'],
    ['Rabu', 'GSG', '19:30', '21:30'],
    ['kamis', 'Libur', '-', '-'],
    ['Jumat', 'GSG', '19:30', '21:30'],
    ['Sabtu', 'GSG', '19:30', '21:30'],
  ];

  // Function to render each cell in the table
  const renderCell = (
    cellData: string,
    cellIndex: number,
    rowIndex: number,
    isLastRow: boolean,
  ) => {
    const cellStyle = rowIndex % 2 === 1 ? styles.oddRow : null;
    const cellTextColor = rowIndex === 0 ? styles.headText : styles.rowText;
    const cellBorderStyle =
      isLastRow && cellIndex === 0
        ? {borderBottomLeftRadius: 20}
        : isLastRow && cellIndex === tableHead.length - 1
        ? {borderBottomRightRadius: 20}
        : null;

    return (
      <View style={[styles.cell, cellStyle, cellBorderStyle]} key={cellIndex}>
        <Text style={cellTextColor}>{cellData}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Table>
        <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        {tableData.map((rowData, rowIndex) => (
          <TableWrapper
            key={rowIndex}
            style={[
              styles.row,
              rowIndex === tableData.length - 1 ? styles.lastRow : null,
            ]}>
            {rowData.map((cellData, cellIndex) =>
              renderCell(
                cellData,
                cellIndex,
                rowIndex,
                rowIndex === tableData.length - 1,
              ),
            )}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: hp('15%'),
    width: '100%',
    backgroundColor: '#fff',
  },
  head: {
    height: hp('4.5%'),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#DEDEDE',
    borderWidth: 1,
    backgroundColor: '#13A89D',
    color: '#fff',
  },
  text: {
    margin: 6,
    fontSize: wp('4%'),
    fontWeight: '600',
    textAlign: 'center',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  oddRow: {
    backgroundColor: '#D9FFFC',
  },
  evenRow: {
    backgroundColor: '#FFF',
  },
  lastRow: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headText: {
    color: '#000',
    fontSize: wp('3.3%'),
  },
  rowText: {
    color: '#000',
    fontSize: wp('3.3%'),
  },
});

export default TableJadwal;
