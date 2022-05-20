// import { useState, useEffect } from "react";
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

export default function AddToArrayModal(props) {
  return (
    <Modal visible={true} transparent={true}>
      <Pressable onPress={props.closeModal}>
        <Text>X</Text>
      </Pressable>
      <Pressable onPress={props.updateVisitArray}>
        <Text>Add to Visit</Text>
      </Pressable>
      <Pressable onPress={() => console.log("Add to Visited")}>
        <Text>Add to Visited</Text>
      </Pressable>
    </Modal>
  );
}
