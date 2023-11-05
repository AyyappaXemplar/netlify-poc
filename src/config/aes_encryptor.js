import CryptoJS from "crypto-js";

const REACT_APP_AES_KEY="PJC7HnliwcxXw4FM8Ep3sX9NIL3R5RE="
const REACT_APP_AES_IV="your_aes_iv_here"

const key = CryptoJS.enc.Utf8.parse(REACT_APP_AES_KEY);     // Use Utf8-Encoder. 
const iv  = CryptoJS.enc.Utf8.parse(REACT_APP_AES_IV);   

export const decryptData = (encryptedData) => {
  if (typeof(encryptedData) === 'object'){
    return encryptedData
  }
  console.log("encryptedData", encryptedData);
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC
  });
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  console.log("decryptedData", decryptedData)
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
  // console.log('requestData.toString()', requestData.toString());
  // console.log('iv.toString()', iv.toString());
  return { encryptedData, ivString };
};
