import { StyleSheet, Text, Modal, Pressable, View } from "react-native";

export default function AddToArrayModal(props) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      onRequestClose={props.closeModal}
    >
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <Pressable onPress={props.closeModal}>
            <Text style={styles.closeBtn}>X</Text>
          </Pressable>
          <View style={styles.btnContainer}>
            <Pressable onPress={() => props.updateVisitArray(props.country)}>
              <Text style={styles.visitBtn}>Add to Visit</Text>
            </Pressable>
            <Pressable onPress={() => props.updateVisitedArray(props.country)}>
              <Text style={styles.visitedBtn}>Add to Visited</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundContainer: {
    width: 300,
    backgroundColor: "#9db0cf",
    borderWidth: 1,
    borderRadius: 8,
  },
  closeBtn: {
    fontSize: 25,
    color: "white",
    paddingLeft: 6,
    paddingTop: 6,
    paddingBottom: 12,
  },
  btnContainer: {
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  visitBtn: {
    fontSize: 20,
    padding: 12,
    color: "white",
    textAlign: "center",
    backgroundColor: "#8a919c",
    borderWidth: 1,
    borderRadius: 6,
  },
  visitedBtn: {
    fontSize: 20,
    marginTop: 12,
    padding: 12,
    color: "white",
    textAlign: "center",
    backgroundColor: "#8a919c",
    borderWidth: 1,
    borderRadius: 6,
  },
});
