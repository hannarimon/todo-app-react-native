import { useState, useEffect } from "react";
import AddToArrayModal from "./AddToArrayModal";
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

export default function SearchModal(props) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
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
        setData(countryData);
      };
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.flagList}>
      <Pressable
        /*
      Works if you use updateVisitArray(item) but not if you send it to ArrayModal and use it as a prop there. (Undefined is not an object?)
      The function being called in ArrayModal is getting called without the (item) part. Unsure how to fix that.
      */
        // onPress={() => setIsModalVisible(true)}
        onPress={openModalHandler}
        onLongPress={() => updateVisitArray(item)}
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

  const updateVisitArray = (item) => {
    console.log(item);
    const selectedCountry = {
      name: {
        common: item.name.common,
      },
      cca2: item.cca2,
      flag: item.flags.png,
    };
    props.addToVisitArray(selectedCountry);
  };

  const updateVisitedArray = (item) => {
    const selectedCountry = {
      name: {
        common: item.name.common,
      },
      cca2: item.cca2,
      flag: item.flags.png,
    };

    props.addToVisitedArray(selectedCountry);
  };

  const filteredData = searchText
    ? data.filter((userInput) =>
        userInput.name.common.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  // const renderSeparator = () => (
  //   <View style={{ borderWidth: 0.5, width: "80%", alignSelf: "center" }} />
  // );

  return (
    <Modal visible={true} transparent={true}>
      <View style={styles.container}>
        {isModalVisible && (
          <AddToArrayModal
            closeModal={closeModalHandler}
            updateVisitArray={updateVisitArray}
            updateVisitedArray={updateVisitedArray}
            // visitArray={visitArray}
            // visitedArray={visitArray}
            // addToVisitArray={updateVisitArray}
            // addToVisitedArray={updateVisitedArray}
          />
        )}
        <Pressable onPress={props.closeModal}>
          <Text>X</Text>
        </Pressable>
        <TextInput
          style={styles.searchbar}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for a country..."
        />

        <FlatList
          //   style={styles.flatList}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.cca2}
          //   ItemSeparatorComponent={renderSeparator}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginHorizontal: 20,
    // paddingHorizontal: 5,
    // backgroundColor: "red",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    // padding: 40,
    height: "85%",
  },
  //   godFather: {
  //     padding: 6,
  //   },
  listContainer: {
    // paddingVertical: 30,
    // marginVertical: 30,
    // height: 50,
  },
  flag: {
    width: 300,
    height: 180,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    marginVertical: 8,
  },
  flagText: {
    fontSize: 20,
    paddingBottom: 6,
    fontWeight: "bold",
    // textAlign: "center",
  },
  flagList: {
    // flexDirection: "row",
    // margin: 6,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  flatList: {
    // height: 400,
    // width: "50%",
    // backgroundColor: "red",
    // marginBottom: 30,
  },
  searchbar: {
    padding: 12,
    marginTop: 12,
    width: "70%",
    borderWidth: 1,
    borderRadius: 3,
    // borderColor: "#ccc",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
  },
});
