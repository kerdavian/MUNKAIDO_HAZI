import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';

import trashIcon from '../assets/Trash_font_awesome.js';
import { getHistory } from '../database';

export default function HistoryPage(props) {
  const [history, setHistory] = useState([]);

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.historyItemContainer,
        styles.shadow,
        item.state === 'in' ? styles.containerIn : styles.containerOut,
      ]}>
      <View style={styles.historyTextContainer}>
        <Text style={styles.currentStateText}>{item.date.toDate().toLocaleString('hu-HU')}</Text>
        <Text
          style={[
            styles.currentStateText,
            item.state === 'in' ? styles.currentStateTextIn : styles.currentStateTextOut,
          ]}>
          {item.state === 'in' ? 'bejött' : 'távozott'}
        </Text>
        if(index == 0)
        {
          <TouchableOpacity style={styles.historyTextContainer}>
            <SvgXml xml={trashIcon} style={styles.removeButtonIcon} />
          </TouchableOpacity>
        }
      </View>
    </View>
  );

  useEffect(() => {
    (async () => {
      console.log(props.userData.email);
      const historyFromFirebase = await getHistory(props.userData.email);
      setHistory(historyFromFirebase);
    })();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item, index => item.id, item.index)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'stretch',
    // https://stackoverflow.com/a/59183680/9004180
    // fixing the scrolling of the FlatList
    // flex: 1 just means "take up the entire space" (whatever "entire" that may be).
    flex: 1,
  },
  historyItemContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTextContainer: {},
  currentStateText: {
    fontSize: 17,
    color: 'white',
  },
  containerIn: {
    backgroundColor: '#165BAA',
  },
  containerOut: {
    backgroundColor: '#173F5F',
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  removeButtonIcon: {
    fontSize: 16,
    color: 'red',
  },
});
