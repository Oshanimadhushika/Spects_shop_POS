import CryptoJS from "crypto-js";

export function encrypt(text) {
  return CryptoJS.AES.encrypt(JSON.stringify(text), "123456789").toString();
}

export function decrypt(data) {
  const bytes = CryptoJS.AES.decrypt(data, "123456789");
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    return null;
  }
}
