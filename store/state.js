const { atom, selector } = require("recoil");

const messagesState = atom({
  key: "messages",
  default: [],
});

const selectedMessageState = atom({
  key: "selectedMessage",
  default: null,
});

const numMessagesState = selector({
  key: "numMessages",
  get: ({ get }) => {
    const allMessages = get(messagesState);
    return allMessages.length;
  },
});

const numUnreadMessagesState = selector({
  key: "numUnreadMessages",
  get: ({ get }) => {
    const allMessages = get(messagesState);
    let numUnreadMessages = 0;
    for (let msgIndex = 0; msgIndex < allMessages.length; msgIndex++) {
      const msg = allMessages[msgIndex];
      if (!msg.read) {
        numUnreadMessages++;
      }
    }
    return numUnreadMessages;
  },
});

const userState = atom({
  key: "user",
  default: {
    // TODO: set default to null; add login page
    email: "iceman@gmail.com",
    password: "Iceman777",
    firstName: "Robert",
    lastName: "Drake",
  },
});

export {
  messagesState,
  selectedMessageState,
  numMessagesState,
  numUnreadMessagesState,
  userState,
};
