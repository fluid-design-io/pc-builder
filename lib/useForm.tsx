import { useEffect } from 'react';
import { useState } from 'react';

function useForm<T extends Record<string, string>>(initial: T) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we're watching change
    return setInputs(initial);
  }, [initialValues]);

  const handleChange = (e) => {
    const { value, name } = e.target ?? e.detail;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, _]) => [key, ''])
    );
    setInputs(blankState as T);
  };

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}

export default useForm;
