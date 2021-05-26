

const initChat = () => {
  if (typeof window !== `undefined`) {
    window.HFCHAT_CONFIG = {
      EMBED_TOKEN: process.env.REACT_APP_EMBED_TOKEN,
      ASSETS_URL: process.env.REACT_APP_ASSETS_URL,

      onload: function () {
        window.HappyFoxChat = this
      }
    }
  }
}

export default initChat;
