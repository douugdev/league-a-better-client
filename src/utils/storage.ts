export const store = (key: string, item: any) =>
  localStorage.setItem(key, JSON.stringify(item));

export const retrieveBoolean = (key: string) =>
  localStorage.getItem(key) === "true";
export const retrieveNumber = (key: string) => {
  const storedNum = localStorage.getItem(key);
  if (storedNum === null) {
    return null;
  }
  return parseInt(storedNum, 10);
};
export const retrieveObject = (key: string) => {
  const storedObject = localStorage.getItem(key);
  if (storedObject === null) {
    return null;
  }
  return JSON.parse(storedObject);
};
export const retrieveString = (key: string) => {
  const storedObject = localStorage.getItem(key);
  if (storedObject === null) {
    return null;
  }
  return storedObject;
};
