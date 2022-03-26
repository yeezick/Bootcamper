export const handleTextChange = (text, property, setterFunction) => {
  setterFunction((state) => {
    return { ...state, [property]: text };
  });
};
