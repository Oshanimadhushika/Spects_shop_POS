import { decrypt, encrypt } from "./encryptionHelper";

export function setLocalStorageData(key, data) {
  let encryptData = encrypt(data);
  localStorage.setItem(key, encryptData);
}

export function getLocalStoragedata(key) {
  let data = localStorage.getItem(key);

  if (data !== null) {
    return decrypt(data);
  } else {
    return null;
  }
}
