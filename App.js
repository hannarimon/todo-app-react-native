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
  const [didSucceed, setDidSucced] = useState(true);

  const updateVisitArray = (selectedCountry) => {
    // Later try useState selectedCountry to create the checkDuplicate(arr) function
    //Instead of some try find
    const alreadyExists = visitArray.some((element) => {
      return selectedCountry.cca2 === element.cca2;
    });
    if (!alreadyExists) {
      setUpdateVisitArray((prevVisitArray) => [
        selectedCountry,
        ...prevVisitArray,
      ]);
      alreadyExists ? setDidSucced(false) : setDidSucced(true);

      console.log(didSucceed);
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
      // setDidSucced(true);
      // Maybe put undefined in didSucced then go to else if
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
          {/* Fix button functionality */}

          <Pressable onPress={() => moveToVisited(item)}>
            <Text style={styles.moveVisitBtn}>Move</Text>
          </Pressable>

          <Pressable onPress={() => deleteVisit(item)}>
            <Text style={styles.deleteVisitBtn}>Delete</Text>
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
            <Text style={styles.moveVisitBtn}>Move</Text>
          </Pressable>

          <Pressable onPress={() => deleteVisited(item)}>
            <Text style={styles.deleteVisitBtn}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
  // FIX MOVE COUNTRY DOUBLE KEY CCA2
  const moveToVisited = (movedCountry) => {
    setUpdateVisitArray((updatedArr) => {
      return updatedArr.filter((country) => country !== movedCountry);
    });

    setUpdateVisitedArray((prevVisitedArray) => [
      movedCountry,
      ...prevVisitedArray,
    ]);
  };
  const moveToVisit = (movedCountry) => {
    setUpdateVisitedArray((updatedArr) => {
      return updatedArr.filter((country) => country !== movedCountry);
    });
    setUpdateVisitArray((prevVisitArray) => [movedCountry, ...prevVisitArray]);
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

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const closeModalHandler = () => {
    setIsModalVisible(false);
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
          didSucced={didSucceed}
        />
      ) : (
        <View>
          {/* <View style={styles.visitList}> */}
          <Text style={styles.title}>Countries I want to visit</Text>
          <FlatList
            // style={styles.visitList}
            data={sortArray(visitArray)}
            extraData={visitArray}
            renderItem={renderVisitItems}
            keyExtractor={(item) => item.cca2}
            showsVerticalScrollIndicator={false}
            bounces={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
          />
          {/* </View> */}

          {/* <View style={styles.visitedList}> */}
          <Text style={styles.title}>Countries I have visited</Text>
          <FlatList
            // style={styles.visitedList}
            data={sortArray(visitedArray)}
            extraData={visitedArray}
            renderItem={renderVisitedItems}
            keyExtractor={(item) => item.cca2}
            showsVerticalScrollIndicator={false}
            overScrollMode="never"
          />

          {/* </View> */}

          <Pressable style={styles.button} onPress={openModalHandler}>
            <Text style={{ color: "white", fontSize: 15, textAlign: "center" }}>
              Search
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

  // visitList: {
  //   height: "50%",
  // },
  // visitedList: {
  //   height: "50%",
  //
  // },
  deleteVisitBtn: {
    fontSize: 20,
    marginLeft: 15,
    padding: 3,
    backgroundColor: "#e01502",
    color: "white",
    borderWidth: 1,
    // color: "red",
    // alignSelf: "flex-end",
  },
  moveVisitBtn: {
    fontSize: 20,
    marginLeft: 20,
    padding: 3,
    borderWidth: 1,
    backgroundColor: "#0399fc",
    alignSelf: "center",
    color: "white",
  },

  deleteVisitedBtn: {
    fontSize: 20,
    paddingBottom: 15,
    // color: "red",
    // alignSelf: "center",
  },
  moveVisitedBtn: {
    fontSize: 26,
    alignSelf: "center",
    color: "blue",
  },

  title: {
    padding: 20,
    // paddingVertical: 6,
    // marginBottom: 12,
    // paddingTop: 10,
    // paddingBottom: 15,
    fontSize: 18,
    textAlign: "center",
    // backgroundColor: "#ff0000",
    color: "white",
    textDecorationLine: "underline",
  },
  button: {
    // marginVertical: 3,
    marginTop: 15,
    marginBottom: 3,

    padding: 18,
    borderWidth: 1,
    borderRadius: 6,
    // alignSelf: "center",
    // width: 100,
    backgroundColor: "#0399fc",
  },
  flag: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: "black",
    // borderRadius: 2,
  },
  flagText: {
    fontSize: 19,
    paddingBottom: 6,
    paddingTop: 3,
    // paddingLeft: 25,
    color: "white",
    // fontWeight: "bold",
    textAlign: "auto",
    // width: 80,
  },
});
