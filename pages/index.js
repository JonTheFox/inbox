import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import { fetchMessages } from "../helpers/messagesHelpers";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  numUnreadMessagesState,
  numMessagesState,
  messagesState,
  userState,
} from "../store/state.js";
import { useEffect } from "react";

export default function Home() {
  const numUnreadMsgs = useRecoilValue(numUnreadMessagesState);
  const numMsgs = useRecoilValue(numMessagesState);
  const setMessages = useSetRecoilState(messagesState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    fetchMessages(user)
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
        <h1 className={styles.title}>hello {user.firstName}</h1>

        <p className={styles.description}>
          You have {numUnreadMsgs} unread messages out of {numMsgs} total.
        </p>
        <div className={styles.grid}>
          <Link href="/messages-list">
            <a className={styles.card}>
              <button>View Messages</button>
            </a>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
