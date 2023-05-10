import React, {useState, useEffect, useMemo} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';

const App = () => {

  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSelected, setSelection] = useState([]);

  const filteredData = useMemo(() => {
    if (!searchQuery) {
      return data;
    }
    const normalizedQuery = searchQuery.toLowerCase();
    return data.filter(item =>
      item.title.toLowerCase().includes(normalizedQuery),
    );
  }, [data, searchQuery]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelection(item)}
      style={{
        flexDirection: 'row',
        margin: 10,
        width: '90%',
        height: 60,
        alignItems:'center',
        borderWidth: 1,
        borderColor: isSelected === item ? 'grey' :'white',
      }}>
      <Image source={{uri: item.image}} style={styles.imgbox} />
      <View style={{height: 20, width: '70%'}}>
        <Text style={{marginHorizontal: 10}}> {item.title}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View>
      <TextInput
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbox}
      />
      <View>
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchbox: {
    height: 50,
    margin: 10,
    width: '95%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  imgbox: {
    height: 45,
    width: 45,
    margin: 5,
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default App;
