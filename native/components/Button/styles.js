import { StyleSheet } from 'react-native';
/**
 * Format seems to be:
 * 1. Base / general styles that won't change regardless of type or style
 * 2. Styles that alter the aesthetic of the component
 * 3. Types that alter the shape of the component
 * 4. Function definition that will determine which stylesheet to use
 */

const baseContainerStyles = {
  alignItems: 'center',
  borderRadius: 4,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  marginBottom: 10,
  width: 102,
};

// styles
const defaultStyle = StyleSheet.create({
  container: {
    ...baseContainerStyles,
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
  },
});

const disabledStyle = StyleSheet.create({
  container: {
    ...baseContainerStyles,
    backgroundColor: '#EBEBE4',
  },
  text: {
    color: '#a9a9a9',
  },
});

const lightStyle = StyleSheet.create({
  container: {
    ...baseContainerStyles,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: '#000',
  },
});

export const getButtonStyles = (style, type) => {
  let finalStyleSheet = {
    container: null,
    text: null,
  };

  if (style === 'light') {
    finalStyleSheet = {
      ...lightStyle,
    };
  } else if (style === 'disabled') {
    finalStyleSheet = {
      ...disabledStyle,
    };
  } else {
    finalStyleSheet = {
      ...defaultStyle,
    };
  }

  if (type === 'long') {
    // todo: hard to read, please improve.
    finalStyleSheet = {
      ...finalStyleSheet,
      container: {
        ...finalStyleSheet.container,
        width: 250,
      },
    };
  }

  return StyleSheet.create(finalStyleSheet);
};
