import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Button,
  FlatList,
  Image,
  TextInput,
} from "react-native";
import SearchModal from "./components/SearchModal";

export default function App() {
  const visitArray = [
    {
      name: {
        common: "France",
      },
    },
    {
      name: {
        common: "England",
      },
    },
    {
      name: {
        common: "Denmark",
      },
    },
  ];

  const visitedArray = [
    {
      name: {
        common: "Sweden",
      },
      cca2: "SE",
    },
    {
      name: {
        common: "Canada",
      },
      cca2: "CA",
    },
    {
      name: {
        common: "Iraq",
      },
      cca2: "IQ",
    },
    {
      name: {
        common: "Syria",
      },
      cca2: "SY",
    },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name.common}</Text>
      {/* Add Images here for later */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {!isModalVisible && (
        <View style={styles.listContainer}>
          <View style={styles.visitList}>
            <Text style={styles.title}>Countries I want to visit</Text>
            <FlatList data={visitArray} renderItem={renderItem} />
          </View>

          <View style={styles.visitedList}>
            <Text style={styles.title}>Countries I have visited</Text>
            <FlatList
              data={visitedArray}
              renderItem={renderItem}
              keyExtractor={(item) => item.cca2}
            />
          </View>

          <Pressable style={styles.button} onPress={openModalHandler}>
            <Text style={{ color: "white", fontSize: 15 }}>Open Modal</Text>
          </Pressable>
        </View>
      )}

      {isModalVisible && <SearchModal closeModal={closeModalHandler} />}
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
});
