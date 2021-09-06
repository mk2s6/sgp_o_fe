const useValidations = () => {
  const setValidations = (fields, errors) => {
    errors.map((i) => fields[i.field](i));
  };
  return { setValidations };
};

export default useValidations;
