import Link from "next/link";
import styles from "../styles/Home.module.css";
import Footer from "../components/Footer";
import { fetchMessages } from "../helpers/messagesHelpers";
import MainHead from "../components/MainHead";

import { useRecoilValue, useRecoilState } from "recoil";
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
  const user = useRecoilValue(userState);
  const [messages, setMessages] = useRecoilState(messagesState);

  useEffect(() => {
    debugger;
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
        <h1 className="glass header">hello {user.firstName}</h1>
        <p className="description">
          You have {numUnreadMsgs} unread messages out of {numMsgs} total.
        </p>

        <Link href="/messages-list">
          <a className="glass btn">
            <button>View Messages</button>
          </a>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
