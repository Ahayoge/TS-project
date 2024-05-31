const addToStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const removeFromStorage = (key: string) => {
  localStorage.removeItem(key);
};

const getFromStorage = (key: string) => {
  let value: string | null = localStorage.getItem(key);
  if (value) return JSON.parse(value);

};

const clearStorage = () => {
  localStorage.clear();
};

export { addToStorage, removeFromStorage, getFromStorage, clearStorage };
