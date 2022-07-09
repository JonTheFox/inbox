import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Messages.module.scss";
import Message from "../components/Message";
import Footer from "../components/Footer";
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

export default function MessagePage() {
  const numUnreadMsgs = useRecoilValue(numUnreadMessagesState);
  const numMsgs = useRecoilValue(numMessagesState);
  const [messages, setMessages] = useRecoilState(messagesState);
  const [selectedMessage, setSelectedMessage] =
    useRecoilState(selectedMessageState);
  const user = useRecoilValue(userState);

  const router = useRouter();

  useEffect(() => {
    if (!selectedMessage) {
      router.push("/messages-list");
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        {selectedMessage && <Message size="large" msg={selectedMessage} />}
      </main>

      <Footer />
    </div>
  );
}
