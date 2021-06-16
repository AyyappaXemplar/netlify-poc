module.exports = {
  setHappyFoxVisitorInfo: (driverFirstName, driverLastName) => {
    window.HappyFoxChat.setVisitorInfo({
      name: `${driverFirstName} ${driverLastName}`
    })
  },
  updateHappyFoxVisitorInfoInQQ: (driverFirstName, driverLastName) => {
    window.HappyFoxChat.setVisitorInfo({
      name: `${driverFirstName} ${driverLastName}`
    })
  },
  updateHappyFoxVisitorInfoInBOL: (driverFirstName, driverLastName, driverEmail, driverPhone) => {
    window.HappyFoxChat.setVisitorInfo({
      name: `${driverFirstName} ${driverLastName}`,
      email: driverEmail &&!!driverEmail.length && driverEmail,
      phoneNumber: !!driverPhone.length && driverPhone,
    })
  },
  unsetHappyFoxVisitorInfo: () => {
    window.HappyFoxChat.unsetVisitor()
  }
}