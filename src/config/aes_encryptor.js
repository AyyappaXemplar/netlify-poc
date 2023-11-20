import CryptoJS from "crypto-js";


const key = CryptoJS.enc.Utf8.parse(process.env.REACT_APP_AES_KEY);     // Use Utf8-Encoder. 

export const decryptData = (encryptedData, ivString) => {
  if (typeof(encryptedData) === 'object'){
    return encryptedData
  }
  const receivedIVBinary = Buffer.from(ivString, 'hex');
  const receivedIV = CryptoJS.lib.WordArray.create(Uint8Array.from(receivedIVBinary));
  const bytes = CryptoJS.AES.decrypt(encryptedData, key, {
    iv: receivedIV,
    mode: CryptoJS.mode.CBC
  });
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedData);
};

export const encryptData = (data) => {
  const body = JSON.stringify(data);
  const randomBytes = CryptoJS.lib.WordArray.random(16);

  // Convert the random bytes to a hexadecimal string
  const ivHex = randomBytes.toString(CryptoJS.enc.Hex);

  const requestData = CryptoJS.AES.encrypt(body, key, {
    iv: randomBytes,
    mode: CryptoJS.mode.CBC
  });
  const encryptedData = requestData.toString();
  const ivString = ivHex;
  return { encryptedData, ivString };
};
