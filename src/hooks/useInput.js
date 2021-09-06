import { useState } from 'react';
import { formatDate } from '../commons/dates';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState();

  const reset = () => setValue(initialValue);

  const onChange = (e) => {
    setValue(e.target ? e.target.value : formatDate(e));
    setError(false);
    setHelperText();
  };
  const setValidationErrors = (e) => {
    setError(true);
    setHelperText(e.message);
  };

  return [value, { value, onChange, error, helperText }, setValidationErrors, reset];
};

export default useInput;
