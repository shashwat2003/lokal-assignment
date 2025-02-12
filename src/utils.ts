export const getKey = (data: any, key: string): any => {
  if (key.includes(".")) {
    const keys = key.split(".");
    return getKey(data[keys[0]], keys.slice(1).join("."));
  }
  return data?.[key];
};
