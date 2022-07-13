import styles from "../styles/Messages.module.scss";
import Message from "../components/Message";
import Footer from "../components/Footer";
import MainHead from "../components/MainHead";
import { useRecoilValue } from "recoil";
import { selectedMessageState } from "../store/state.js";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function MessagePage() {
  const selectedMessage = useRecoilValue(selectedMessageState);

  const router = useRouter();

  useEffect(() => {
    if (!selectedMessage) {
      router.push("/");
    }
  }, []);

  return (
    <div className={styles.container}>
      <MainHead />

      <main className="main">
        {selectedMessage && <Message size="large" msg={selectedMessage} />}
      </main>

      <Footer />
    </div>
  );
}
