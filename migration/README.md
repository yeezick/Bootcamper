# Getting set up with React Native

The following must be installed and configured before starting React Native

### Expo

Install `Expo CLI` by running:

```
$ npm install --global expo-cli
```

### XCode

Download v13.2.1 from the [Apple Website here](https://developer.apple.com/xcode/).

Once XCode is installed

- Open XCode
- Open Preferences
- Select the `Locations` tab
- Select the latest version in the following dropdown. If this is your first time installing XCode, it will be empty & only have 1 option.
  ![xcode dropwdown](https://i.stack.imgur.com/YkCR4.png)

### Java

It's possible you may also have to install Java for the Android parts to work correctly, like the Android simulator for example. If you run into errors during installation, make sure to let me know.

I already had Java downloaded on my machine, but this would be important to resolve.

### Dependencies

By this point it should be safe to install the dependencies for the app with:

- `npm install`
- `npm start`

If you'd like, you can use Expo Client, it's a native app that allows us to view the app after running `npm start` on our phone instead of needing to rely on the simulators in Expo.

## Resources

- [React Native docs](https://reactnative.dev/docs/getting-started)
- [Expo CLI docs](https://docs.expo.dev/index.html)

## Issues

If you run into errors during installation or throughout development, create an `issue` on this repo adhering to the template in `IssueTicket.md`
If you run into erros/quirks that are specific to developing in React Native vs. React, then we encourage you to make a ticket. No template is necessary, instead we'll take about what we discovered that was different. After we discuss the issue, it will be your charge to create documentation for the quirk below.

### For example:

#### Title:

React-Native

#### Body:

While trying to import styles I found out that in order to style React Native components, we have to pass in an object of those styles to the `style` prop. "Class names" are not natural to react-native like in React, though every component in React-Native has a `style` prop by default. Supporting documentation can be found here. This is an example:

<b><i>Invalid:</i></b>

```
import "./styles.css";
export default function App() {
  return (
    <View className="container">
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}
```

<b><i>Valid:</i></b>

```
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

```
