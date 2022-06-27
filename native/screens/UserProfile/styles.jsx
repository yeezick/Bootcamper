import { StyleSheet } from "react-native-web";

const styles = StyleSheet.create({
  editContainer: {
    alignItems: "flex-end",
    marginRight: 5
  },
  editButton: {
    fontSize: 45,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  placeholderImage: {
    borderRadius: 100,
    backgroundColor: '#c4c4c4',
    height: 150,
    width: 150,
  },
  portfolio: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  words: {
    color: 'white',
    marginHorizontal:10
  },
  wordContainer: {
    backgroundColor: '#313131',
    marginHorizontal: 15,
    marginTop: 15,
  }
});

export {styles}