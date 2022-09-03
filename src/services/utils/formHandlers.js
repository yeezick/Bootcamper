export const handleChange = (e, property, setterFunction) => {
  const { value } = e.target;
  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};

export const handleTextChange = (newValue, propertyToUpdate, setterFunction) => {
  setterFunction((state) => {
    return { ...state, [propertyToUpdate]: newValue };
  });
};


