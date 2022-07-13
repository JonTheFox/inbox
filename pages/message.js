import styles from "../styles/Messages.module.scss";
import Message from "../components/Message";
import Footer from "../components/Footer";
import MainHead from "../components/MainHead";
import { useRecoilValue, useRecoilState } from "recoil";
import { selectedMessageState, messagesState } from "../store/state.js";
import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

export default function MessagePage() {
  const [selectedMessage, setSelectedMessage] =
    useRecoilState(selectedMessageState);
  const [messages, setMessages] = useRecoilState(messagesState);

  const router = useRouter();

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
    if (!selectedMessage) {
      router.push("/messages-list");
    }
  }, [selectedMessage]);

  return (
    <div className={styles.container}>
      <MainHead />

      <main className="main">
        {selectedMessage && (
          <Message
            size="large"
            msg={selectedMessage}
            onDelete={onMessageDelete}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
