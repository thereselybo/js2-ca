export const likesKey = "likes";
export const userKey = "user";
export const tokenKey = "token";

export function getFromStorage(key) {
  const value = localStorage.getItem(key);
  if (!value) {
    return [];
  }
  return JSON.parse(value);
}

export function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeFromStorage(key) {
  localStorage.removeItem(key);
}
