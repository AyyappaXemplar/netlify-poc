

const initChat = (quote) => {

  if (typeof window !== `undefined`) {
    //console.log(quote.drivers[0].first_name, quote.drivers.length >= 0);
    window.HFCHAT_CONFIG = {
      EMBED_TOKEN: process.env.REACT_APP_EMBED_TOKEN,
      ASSETS_URL: process.env.REACT_APP_ASSETS_URL,

      onload: function () {
        window.HappyFoxChat = this

        const drivername = () => {
          if (quote.drivers.length >= 0) {
            return `${quote.drivers[0].first_name} ${quote.drivers[0].last_name}`
          }
          else {
            return "name here"
          }
        };
        const email = () => {
          if (quote.drivers.length >= 0) {
            return `${quote.drivers[0].email}`
          }
          else {
            return "email here"
          }
        };
        const customFields = {
          name: drivername(),
          email: email()
        }

        window.HappyFoxChat.unsetVisitor(function(err) {
          if (err) {
           console.error('Failed to reset the visitor. Error:', err);
          } else {
           console.log('Visitor reset successful');
          }
        });

        window.HappyFoxChat.setVisitorInfo(customFields, function (err, resp) {
          if (err) {
            console.error('Failed to set visitor details. Error:', err);
          } else {
            console.log('Added visitor details:', resp);
          }
        });
      }
    }
  }
}

export default initChat;
