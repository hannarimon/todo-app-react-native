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
  Alert,
} from "react-native";
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

  const [visitArray, setUpdateVisitArray] = useState(initialVisitArray);
  const [visitedArray, setUpdateVisitedArray] = useState(initialVisitedArray);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
  };

  const updateVisitArray = (selectedCountry) => {
    const alreadyExists = visitArray.some((element) => {
      return selectedCountry.cca2 === element.cca2;
    });

    if (!alreadyExists) {
      setUpdateVisitArray((prevVisitArray) => [
        selectedCountry,
        ...prevVisitArray,
      ]);
    } else {
      Alert.alert("Error", "The country already exists in the visit list.");
    }
  };

  const updateVisitedArray = (selectedCountry) => {
    const alreadyExists = visitedArray.some((element) => {
      return selectedCountry.cca2 === element.cca2;
    });

    if (!alreadyExists) {
      setUpdateVisitedArray((prevVisitedArray) => [
        selectedCountry,
        ...prevVisitedArray,
      ]);
    } else {
      Alert.alert("Error", "The country already exists in the visited list.");
    }
  };

  const renderVisitItems = ({ item }) => (
    <View>
      <Text style={styles.flagText}>{item.name.common}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.flag}
          source={{
            uri: item.flag,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => moveToVisited(item)}>
            <Text style={styles.moveBtn}>Move</Text>
          </Pressable>

          <Pressable onPress={() => deleteVisit(item)}>
            <Text style={styles.deleteBtn}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const renderVisitedItems = ({ item }) => (
    <View>
      <Text style={styles.flagText}>{item.name.common}</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={styles.flag}
          source={{
            uri: item.flag,
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={() => moveToVisit(item)}>
            <Text style={styles.moveBtn}>Move</Text>
          </Pressable>

          <Pressable onPress={() => deleteVisited(item)}>
            <Text style={styles.deleteBtn}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const moveToVisited = (movedCountry) => {
    const alreadyExists = visitedArray.some((element) => {
      return movedCountry.cca2 === element.cca2;
    });

    if (!alreadyExists) {
      setUpdateVisitArray((updatedArr) => {
        return updatedArr.filter((country) => country !== movedCountry);
      });

      setUpdateVisitedArray((prevVisitedArray) => [
        movedCountry,
        ...prevVisitedArray,
      ]);
    } else {
      Alert.alert("Error", "The country already exists in the visited list.");
    }
  };

  const moveToVisit = (movedCountry) => {
    const alreadyExists = visitArray.some((element) => {
      return movedCountry.cca2 === element.cca2;
    });

    if (!alreadyExists) {
      setUpdateVisitedArray((updatedArr) => {
        return updatedArr.filter((country) => country !== movedCountry);
      });

      setUpdateVisitArray((prevVisitArray) => [
        movedCountry,
        ...prevVisitArray,
      ]);
    } else {
      Alert.alert("Error", "The country already exists in the visit list.");
    }
  };

  const deleteVisit = (deletedCountry) => {
    setUpdateVisitArray((updatedArr) => {
      return updatedArr.filter((country) => country !== deletedCountry);
    });
  };

  const deleteVisited = (deletedCountry) => {
    setUpdateVisitedArray((updatedArr) => {
      return updatedArr.filter((country) => country !== deletedCountry);
    });
  };

  const sortArray = (arr) => {
    return arr.sort((a, b) => a.name.common.localeCompare(b.name.common));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {isModalVisible ? (
        <SearchModal
          closeModal={closeModalHandler}
          addToVisitArray={updateVisitArray}
          addToVisitedArray={updateVisitedArray}
          sortArray={sortArray}
        />
      ) : (
        <View>
          <Text style={styles.title}>Countries I want to visit</Text>
          <FlatList
            style={{ height: "50%" }}
            data={sortArray(visitArray)}
            extraData={visitArray}
            renderItem={renderVisitItems}
            keyExtractor={(item) => item.cca2}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          />

          <Text style={styles.title}>Countries I have visited</Text>
          <FlatList
            style={{ height: "50%" }}
            data={sortArray(visitedArray)}
            extraData={visitedArray}
            renderItem={renderVisitedItems}
            keyExtractor={(item) => item.cca2}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          />

          <Pressable style={styles.openModalBtn} onPress={openModalHandler}>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              Add a country
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    backgroundColor: "#c74444",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteBtn: {
    fontSize: 20,
    marginLeft: 15,
    padding: 3,
    backgroundColor: "#e01502",
    color: "white",
    borderWidth: 1,
  },
  moveBtn: {
    fontSize: 20,
    marginLeft: 20,
    padding: 3,
    borderWidth: 1,
    backgroundColor: "#0399fc",
    alignSelf: "center",
    color: "white",
  },
  title: {
    padding: 20,
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },
  openModalBtn: {
    marginTop: 15,
    marginBottom: 6,
    padding: 18,
    borderWidth: 1,
    borderRadius: 6,
    backgroundColor: "#0399fc",
  },
  flag: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: "black",
  },
  flagText: {
    fontSize: 19,
    paddingBottom: 6,
    paddingTop: 3,
    color: "white",
    textAlign: "auto",
  },
});
