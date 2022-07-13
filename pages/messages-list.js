import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Messages.module.scss";
import Message from "../components/Message";
import Footer from "../components/Footer";
import MainHead from "../components/MainHead";
import { fetchMessages } from "../helpers/messagesHelpers";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  numUnreadMessagesState,
  numMessagesState,
  messagesState,
  userState,
  selectedMessageState,
} from "../store/state.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MessagesList() {
  const numUnreadMsgs = useRecoilValue(numUnreadMessagesState);
  const numMsgs = useRecoilValue(numMessagesState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const user = useRecoilValue(userState);
  const [selectedMessage, setSelectedMessage] =
    useRecoilState(selectedMessageState);
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

  useEffect(() => {
    if (!selectedMessage) {
      fetchMessages(user)
        .then((msgs) => {
          setMessages(msgs);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div className={styles.container}>
      <MainHead />

      <main>
        <h1 className="header glass">Messages</h1>
        <ul className={styles["messages-list"]}>
          {messages?.map?.((msg) => {
            return (
              <li
                className={styles["messages-list-item"]}
                onClick={() => handleMessageClick(msg)}
                key={msg.id}
              >
                <Message size="small" msg={msg} />
              </li>
            );
          })}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
