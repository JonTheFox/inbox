import styles from "../styles/Messages.module.scss";
import Message from "../components/Message";
import Footer from "../components/Footer";
import TextInput from "../components/TextInput";
import MainHead from "../components/MainHead";
import { fetchMessages } from "../helpers/messagesHelpers";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  messagesState,
  userState,
  selectedMessageState,
  filteredMessagesState,
  queryState,
} from "../store/state.js";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export default function MessagesList() {
  const [messages, setMessages] = useRecoilState(messagesState);
  const user = useRecoilValue(userState);
  const [selectedMessage, setSelectedMessage] =
    useRecoilState(selectedMessageState);
  const [query, setQuery] = useRecoilState(queryState);
  const filteredMessages = useRecoilValue(filteredMessagesState);
  const router = useRouter();

  function handleMessageClick(clickedMsg) {
    if (!clickedMsg) {
      throw new Error("No msg provided");
    }

    const clickedMsgClone = JSON.parse(JSON.stringify(clickedMsg));
    clickedMsgClone.read = true;
    const messagesClone = JSON.parse(JSON.stringify(messages));
    const msgIndex = messages.indexOf(clickedMsg);
    messagesClone[msgIndex] = clickedMsgClone;
    setMessages(messagesClone);
    setSelectedMessage(clickedMsgClone);

    router.push("/message");
  }

  const onMessageDelete = useCallback(
    (msg) => {
      const msgIndex = messages.indexOf(msg);
      const messagesClone = JSON.parse(JSON.stringify(messages));
      messagesClone.splice(msgIndex, 1);
      setMessages(messagesClone);
      setSelectedMessage(null);
    },
    [messages, setMessages, setSelectedMessage]
  );

  useEffect(() => {
    if (!messages || !messages.length) {
      fetchMessages(user)
        .then((msgs) => {
          setMessages(msgs);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [messages, fetchMessages, setMessages]);

  return (
    <div className={styles.container}>
      <MainHead />

      <main>
        <h1 className="header glass">Messages</h1>
        <TextInput value={query} onChange={(value) => setQuery(value)} />
        <ul className={styles["messages-list"]}>
          {filteredMessages?.map?.((msg) => {
            return (
              <li
                className={styles["messages-list-item"]}
                onClick={() => handleMessageClick(msg)}
                key={msg.id}
              >
                <Message size="small" msg={msg} onDelete={onMessageDelete} />
              </li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
