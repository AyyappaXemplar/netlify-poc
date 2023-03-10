


function validateExpression(regPattern, licenseNumber, errorMsg) {
  var patt = new RegExp(regPattern);
  var chkVal = patt.test(licenseNumber);

  var rtnVal = "";

  if (!chkVal) {
    rtnVal = errorMsg;
    return rtnVal;
  }
  else {
    return
  }
}

export const validateLicense = (attributes) => {

  const licenseNumber = attributes.license_number;
  const stateCode = attributes.license_state


  // see https://ntsi.com/drivers-license-format/
  var oneToSevenNumeric = /^[0-9]{1,7}$/;
  var oneAlpha = /(.*[A-Za-z]){1}/;
  var oneAlphaPlusSeven = /^.[0-9]{7}$/;
  var twoAlpha = /(.*[A-Za-z]){2}/;
  var alphaPlusSixNumeric = /(.*[0-9]){6}$/;
  var threeToFiveNumeric = /(.*[0-9]){3,5}$/;
  var fiveToNineNumeric = /(.*[0-9]){5,9}/;
  var sixNumeric = /^[0-9]{6}$/;
  var sevenNumeric = /^[0-9]{7}$/;
  var sevenToNineNumeric = /^[0-9]{7,9}$/;
  var eightAreNumbers = /(.*[0-9]){8}/;
  var nineNumeric = /^[0-9]{9}$/;
  var nineAlphaChars = /^[A-Za-z0-9]{9}$/;
  var tenNumeric = /^[0-9]{10}$/;
  var elevenNumeric = /^.[0-9]{11}$/;
  var twelveNumeric = /^.[0-9]{12}$/;
  var hPlusEight = /([H][0-9]{8})$/;
  var sevenPlusX = /([H][0-9]{7}X)$/;
  var alphaPlusNineNumeric = /^.[0-9]{9}$/;
  if (stateCode === undefined || licenseNumber === undefined) {
      return "";
  }
  if (stateCode === 'AK') {
      return validateExpression(oneToSevenNumeric, licenseNumber, "Must be 1-7 numeric");
  }
  if (stateCode === 'AL') {
      return validateExpression(sevenNumeric, licenseNumber, "Must be 7 numeric");
  }
  if (stateCode === 'AR' || stateCode === 'MS') {
      return validateExpression(nineNumeric, licenseNumber, "Must be 9 numeric");
  }
  if (stateCode === 'AZ') {
      if (nineNumeric.test(licenseNumber) === true) {
          return "";
      }
      if (oneAlpha.test(licenseNumber) && eightAreNumbers.test(licenseNumber)) {
          return "";
      }
      if (twoAlpha.test(licenseNumber) && threeToFiveNumeric.test(licenseNumber) && licenseNumber.length < 8) {
          return "";
      }
      return "Must be 1 Alphabetic, 8 Numeric; or 2 Alphabetic, 3-6 Numeric; or 9 Numeric";
  }
  if (stateCode === 'CA') {
      if (oneAlpha.test(licenseNumber) && oneAlphaPlusSeven.test(licenseNumber)) {
          return "";
      }
      return "Must be 1 alpha and 7 numeric";
  }
  if (stateCode === 'CO' || stateCode === 'CN' || stateCode === 'CT') {
      return validateExpression(nineNumeric, licenseNumber, "Must be 9 numeric");
  }
  if (stateCode === 'DC') {
      if (sevenNumeric.test(licenseNumber) || nineNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 7 - 9 numeric";
  }
  if (stateCode === 'DE') {
      if (oneToSevenNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 1 - 7 numeric";
  }
  if (stateCode === 'FL') {
      if (oneAlpha.test(licenseNumber) && twelveNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 1 alpha, 12 numeric";
  }
  if (stateCode === 'GA') {
      if (sevenToNineNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 7 - 9 numeric";
  }
  if (stateCode === 'HI') {
      if (nineNumeric.test(licenseNumber) || hPlusEight.test(licenseNumber)) {
          return "";
      }
      return "Must be 'H' + 8 numeric; 9 numeric";
  }
  if (stateCode === 'ID') {
      if (nineNumeric.test(licenseNumber) || sixNumeric.test(licenseNumber) || (twoAlpha.test(licenseNumber) && alphaPlusSixNumeric.test(licenseNumber))) {
          return "";
      }
      return "Must be 9 numbers or 6 numbers; or 2 char, 6 numbers ";
  }
  if (stateCode === 'IL') {
      if (oneAlpha.test(licenseNumber) && elevenNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 1 character and 10 numbers";
  }
  if (stateCode === 'IN') {
      if (tenNumeric.test(licenseNumber) || nineNumeric.test(licenseNumber) || alphaPlusNineNumeric.test(licenseNumber) ) {
          return "";
      }
      return "Must be 10 numbers";
  }
  if (stateCode === 'IA') {
      if (nineAlphaChars.test(licenseNumber) || nineNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 9 alpha numbers";
  }
  if (stateCode === 'KS' || stateCode === 'KY') {
      if (nineNumeric.test(licenseNumber) || (oneAlpha.test(licenseNumber) && eightAreNumbers.test(licenseNumber) && licenseNumber.length === 9)) {
          return "";
      }
      return "Must be 1 alpha and 8 numeric";
  }
  if (stateCode === 'LA') {
      if (nineNumeric.test(licenseNumber) === true) {
          return "";
      }
      return "Must be 9 numeric";
  }
  if (stateCode === 'ME') {
      if (sevenNumeric.test(licenseNumber) || sevenPlusX.test(licenseNumber)) {
          return "";
      }
      return "Must be 7 numeric";
  }
  if (stateCode === 'MD' || stateCode === 'MI' || stateCode === 'MN') {
      if (oneAlpha.test(licenseNumber) && twelveNumeric.test(licenseNumber)) {
          return "";
      }
      return "1 Alphabetic, 12 Numeric";
  }
  if (stateCode === 'MA') {
      if ((oneAlpha.test(licenseNumber) && eightAreNumbers.test(licenseNumber) && licenseNumber.length === 9) || nineNumeric.test(licenseNumber)) {
          return "";
      }
      return "Must be 1 alpha, 8 numeric; 9 numeric";
  }
  if (stateCode === 'MO') {
      if ((oneAlpha.test(licenseNumber) && fiveToNineNumeric.test(licenseNumber) && licenseNumber.length < 11) || nineNumeric.test(licenseNumber)) {
          return "";
      }
      return "1 alpha - 5-9 Numeric or 9 numeric";
  }
  return "";
};
