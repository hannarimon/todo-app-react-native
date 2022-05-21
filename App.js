import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import AddToArrayModal from "./components/AddToArrayModal";
import SearchModal from "./components/SearchModal";

export default function App() {
  const initialVisitArray = [
    {
      name: {
        common: "France",
      },
      cca2: "FR",
      flag: "https://flagcdn.com/w320/fr.png",
    },
    {
      name: {
        common: "United Kingdom",
      },
      cca2: "GB",
      flag: "https://flagcdn.com/w320/gb.png",
    },
    {
      name: {
        common: "Denmark",
      },
      cca2: "DK",
      flag: "https://flagcdn.com/w320/dk.png",
    },
  ];

  const initialVisitedArray = [
    {
      name: {
        common: "Sweden",
      },
      cca2: "SE",
      flag: "https://flagcdn.com/w320/se.png",
    },
    {
      name: {
        common: "Canada",
      },
      cca2: "CA",
      flag: "https://flagcdn.com/w320/ca.png",
    },
    {
      name: {
        common: "Iraq",
      },
      cca2: "IQ",
      flag: "https://flagcdn.com/w320/iq.png",
    },
    {
      name: {
        common: "Syria",
      },
      cca2: "SY",
      flag: "https://flagcdn.com/w320/sy.png",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const [visitArray, setUpdateVisitArray] = useState(initialVisitArray);
  const [visitedArray, setUpdateVisitedArray] = useState(initialVisitedArray);

  const updateVisitArray = (selectedCountry) => {
    setUpdateVisitArray((prevVisitArray) => [
      selectedCountry,
      ...prevVisitArray,
    ]);
  };
  const updateVisitedArray = (selectedCountry) => {
    setUpdateVisitedArray((prevVisitedArray) => [
      selectedCountry,
      ...prevVisitedArray,
    ]);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name.common}</Text>
      <Image
        style={styles.flag}
        source={{
          uri: item.flag,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {!isModalVisible && (
        <View style={styles.listContainer}>
          <View style={styles.visitList}>
            <Text style={styles.title}>Countries I want to visit</Text>
            <FlatList
              data={visitArray}
              extraData={visitArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.cca2}
            />
          </View>

          <View style={styles.visitedList}>
            <Text style={styles.title}>Countries I have visited</Text>
            <FlatList
              data={visitedArray}
              extraData={visitedArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.cca2}
            />
          </View>

          <Pressable style={styles.button} onPress={openModalHandler}>
            <Text style={{ color: "white", fontSize: 15 }}>Open Modal</Text>
          </Pressable>
        </View>
      )}

      {isModalVisible && (
        <SearchModal
          closeModal={closeModalHandler}
          addToVisitArray={updateVisitArray}
          addToVisitedArray={updateVisitedArray}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    flex: 1,
    // width: "100%",
    // height: "50%",
    // flexDirection: "row",
    // height: "80%",
    alignItems: "center",
    // justifyContent: "center",
  },
  listContainer: {
    // flex: 1,
    // flexDirection: "row",
    justifyContent: "center",
    // backgroundColor: "red",
    // alignItems: "center",
  },
  flatList: {
    // backgroundColor: "red",
    // height: "70%",
  },
  visitList: {
    height: 200,
  },
  visitedList: {
    // backgroundColor: "green",
    height: 200,
  },
  title: {
    padding: 20,
    marginBottom: 12,
    width: "100%",
    // backgroundColor: "red",
    borderRadius: 6,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderRadius: 6,
    width: "100%",
    padding: 18,
    backgroundColor: "blue",
  },
  flag: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 2,
    // marginVertical: 8,
  },
});
