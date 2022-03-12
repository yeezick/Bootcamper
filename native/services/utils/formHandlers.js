export const handleChange = (e, property, setterFunction) => {
  const { value } = e.target;
  setterFunction((state) => {
    return { ...state, [property]: value };
  });
};
