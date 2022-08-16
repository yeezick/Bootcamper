const baseContainerStyles = {
  alignItems: 'center',
  borderRadius: 10,
  display: 'flex',
  height: 50,
  justifyContent: 'center',
  marginBottom: 10,
  width: 250,
};

const defaultStyle = {
  container: {
    ...baseContainerStyles,
    backgroundColor: '#5C5C5C',
  },
  text: {
    color: '#fff',
  },
};

const disabledStyle = {
  container: {
    ...baseContainerStyles,
    backgroundColor: '#EBEBE4',
  },
  text: {
    color: '#5c5c5c',
  },
};

const lightStyle = {
  container: {
    ...baseContainerStyles,
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    color: '#000',
  },
};

export const getButtonStyles = (style, type) => {
  let finalStyleSheet = {
    container: null,
    text: null,
  };

  if (style === 'light') {
    finalStyleSheet = lightStyle;
  } else if (style === 'disabled') {
    finalStyleSheet = disabledStyle;
  } else {
    finalStyleSheet = defaultStyle;
  }

  if (type === 'long') {
    finalStyleSheet = {
      ...finalStyleSheet,
      container: {
        ...finalStyleSheet.container,
        width: 250,
      },
    };
  }

  return finalStyleSheet
};