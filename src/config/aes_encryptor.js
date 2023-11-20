import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_KEY); 
const iv  = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_IV);   

export const decryptData = (encryptedData) => {
  if (typeof(encryptedData) === 'object'){
    return encryptedData
  }
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const encryptData = (data) => {
  const body = JSON.stringify(data);

  const requestData = CryptoJS.AES.encrypt(body, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });
  const encryptedData = requestData.toString();
  const ivString = iv.toString();
  return { encryptedData, ivString };
};
