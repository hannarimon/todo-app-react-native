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

/*
If arsed, do Todo with DB, else do Country visit list

restcountries.com

CREATE A REVERSE FILTER, ONLY SHOW THINGS THAT HAVE THE LETTERS MAX ON UDEMY SHOWED IT BEFORE (FILTER)

useEffect with timeout. Like a wait before search/fetching
*/
export default function App() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const dummyData = [
    {
      name: {
        common: "Sweden",
      },
    },
    {
      name: {
        common: "Finland",
      },
    },
    {
      name: {
        common: "Denmark",
      },
    },
  ];
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        let countryData = await response.json();
        setData(countryData);
        // console.log(data);
      };
      fetchData();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const filteredData = searchText
    ? data.filter((userInput) =>
        userInput.name.common.toLowerCase().includes(searchText.toLowerCase())
      )
    : data;

  const renderItem = ({ item }) => (
    <View style={styles.flagList}>
      <Text style={styles.flagText}>{item.name.common}</Text>
      <Image
        style={styles.flag}
        source={{
          uri: item.flags.png,
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <Pressable>
        <Text>Search for a country</Text>
      </Pressable> */}
      <View style={styles.categories}>
        {/* <View style={styles.savedList}>
          <Text>Countries I want to visit</Text>
          <FlatList
            data={dummyData}
            renderItem={({ item }) => (
              <View>
                <Text>{item.name.common}</Text>
              </View>
            )}
          />

        </View> */}

        <TextInput
          style={styles.searchbar}
          onChangeText={setSearchText}
          value={searchText}
          placeholder="Search for a country..."
        ></TextInput>
      </View>

      {/* Make the FlatList into a modal. Show the list of countries you want to visit otherwise */}

      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.cca2}
        />
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 400,
    // backgroundColor: "green",
    alignItems: "center",
    // justifyContent: "center",
  },
  categories: {
    // height: 50,
    // paddingVertical: 10,
    marginTop: 100,
    // backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  listContainer: {
    // paddingVertical: 30,
    // marginVertical: 30,
    // height: 50,
  },
  flag: {
    width: 160,
    borderWidth: 1,
    borderColor: "black",
    height: 110,
    marginLeft: 8,
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
    padding: 6,
    width: "50%",
    borderWidth: 1,
    borderRadius: 3,
    // borderColor: "#ccc",
    fontSize: 16,
    textAlign: "center",
  },
});
