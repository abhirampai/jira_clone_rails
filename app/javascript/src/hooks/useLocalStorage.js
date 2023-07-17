import { useState } from "react";

import { isNil } from "ramda";

const getStorageValue = (key, defaultValue) => {
  if (key in localStorage) return JSON.parse(localStorage.getItem(key));

  return defaultValue;
};

const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() =>
    getStorageValue(key, defaultValue)
  );

  const setValue = value => {
    if (isNil(value)) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
    setStoredValue(value);
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
