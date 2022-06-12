import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Alert, Modal, Text, View, StyleSheet, Pressable, Appearance  } from "react-native";

export default function ModalComp() {
  const [modalVisible, setModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  Appearance.addChangeListener((scheme) => {
    console.log(scheme.colorScheme)
    setTheme(scheme.colorScheme)
  })

  return (
    <View style={theme == 'light'?styles.centeredView:darkMode.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={theme == 'light'?styles.centeredView:darkMode.centeredView}>
          <View style={theme == 'light'?styles.modalView:darkMode.modalView}>
            <Text style={theme == 'light'?styles.modalText:darkMode.modalText}>Your Content</Text>
            <Pressable
              style={theme == 'light'?[styles.button, styles.buttonClose]:[darkMode.button, darkMode.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={theme == 'light'?styles.textStyle:darkMode.textStyle}>Add Project</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 400,
    width: 300,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 18,
    padding: 20,
    elevation: 2,
    borderWidth: 2,
  },
  buttonOpen: {
    backgroundColor: "white",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  textStyle: {
    color: "#1B1B1B",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const darkMode = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    height: 400,
    width: 300,
    margin: 20,
    backgroundColor: "#5C5C5C",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    // shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 18,
    padding: 20,
    elevation: 2,
    borderWidth: 2,
    // borderColor: "white"
  },
  buttonOpen: {
    backgroundColor: "#B6B6B6",
  },
  buttonClose: {
    backgroundColor: "#B6B6B6",
  },
  textStyle: {
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white"
  }
});


