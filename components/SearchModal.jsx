import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import AddToArrayModal from "./AddToArrayModal";

export default function SearchModal(props) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [country, setCountry] = useState({});

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = (item) => {
    setCountry(item);
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        let countryData = await response.json();
        setData(countryData.sort());
      };
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.flagList}>
      <Pressable
        onPress={() => openModalHandler(item)}
        onLongPress={() => openModalHandler(item)}
      >
        <Text style={styles.flagText}>{item.name.common}</Text>
        <Image
          style={styles.flag}
          source={{
            uri: item.flags.png,
          }}
        />
      </Pressable>
    </View>
  );

  const updateVisitArray = (country) => {
    const selectedCountry = {
      name: {
        common: country.name.common,
      },
      cca2: country.cca2,
      flag: country.flags.png,
    };

    props.addToVisitArray(selectedCountry);
  };

  const updateVisitedArray = (country) => {
    const selectedCountry = {
      name: {
        common: country.name.common,
      },
      cca2: country.cca2,
      flag: country.flags.png,
    };

    props.addToVisitedArray(selectedCountry);
  };

  const filteredData = searchText
    ? props
        .sortArray(data)
        .filter((item) =>
          item.name.common.toLowerCase().includes(searchText.toLowerCase())
        )
    : props.sortArray(data);

  return (
    <Modal
      transparent={true}
      animationType="slide"
      onRequestClose={props.closeModal}
    >
      {isModalVisible && (
        <AddToArrayModal
          closeModal={closeModalHandler}
          country={country}
          updateVisitArray={updateVisitArray}
          updateVisitedArray={updateVisitedArray}
        />
      )}

      <Pressable onPress={props.closeModal}>
        <Text style={styles.closeBtn}>X</Text>
      </Pressable>

      <TextInput
        style={styles.searchbar}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search..."
        multiline={true}
        numberOfLines={1}
      />
      <View style={{ marginTop: 40, borderBottomWidth: 0.6 }} />

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.cca2}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  flag: {
    width: 300,
    height: 180,
    borderWidth: 1,
    borderColor: "black",
    marginVertical: 8,
  },
  flagText: {
    fontSize: 18,
    paddingBottom: 6,
    textAlign: "center",
    color: "white",
  },
  flagList: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  searchbar: {
    padding: 12,
    marginTop: 6,
    width: "80%",
    borderWidth: 1,
    borderRadius: 3,
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    color: "white",
  },
  closeBtn: {
    backgroundColor: "#0399fc",
    marginTop: 4,
    marginLeft: 40,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    textShadowColor: "black",
    textShadowRadius: 3,
    color: "white",
    fontSize: 16,
    alignSelf: "flex-start",
  },
});
