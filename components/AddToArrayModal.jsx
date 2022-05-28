import { StyleSheet, Text, Modal, Pressable, View } from "react-native";

export default function AddToArrayModal(props) {
  return (
    //Fix Add Country Modal Styling
    <Modal transparent={true}>
      <View style={styles.container}>
        <Pressable onPress={props.closeModal}>
          <Text>X</Text>
        </Pressable>
        <Pressable onPress={() => props.updateVisitArray(props.country)}>
          <Text>Add to Visit</Text>
        </Pressable>
        <Pressable onPress={() => props.updateVisitedArray(props.country)}>
          <Text>Add to Visited</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    // justifyContent: "flex-end",
  },
});
