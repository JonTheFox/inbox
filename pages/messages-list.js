import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import MsgShort from "../components/MsgShort";
import Footer from "../components/Footer";
import { fetchMessages } from "../helpers/messagesHelpers";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  numUnreadMessagesState,
  numMessagesState,
  messagesState,
  userState,
} from "../store/state.js";
import { useEffect } from "react";

export default function MessagesList() {
  const numUnreadMsgs = useRecoilValue(numUnreadMessagesState);
  const numMsgs = useRecoilValue(numMessagesState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    fetchMessages()
      .then((msgs) => {
        setMessages(msgs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {messages?.map?.((msg) => {
          debugger;
          return <MsgShort key={user.email} msg={msg} />;
        })}
        ;
      </main>

      <Footer />
    </div>
  );
}
