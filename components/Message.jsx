import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { messagesState } from "../store/state.js";
import styles from "../styles/Messages.module.scss";
import { FaBeer, MiDelete } from "react-icons/fa";

const Message = ({ msg = {}, size = "small" }) => {
  const { subject = "", content = "", read = false, id } = msg;
  const [messages, setMessages] = useRecoilState(messagesState);

  const deleteMsg = useCallback(function (ev, msg) {
    ev.stopPropagation();
    const msgIndex = messages.indexOf(msg);
    const messagesClone = JSON.parse(JSON.stringify(messages));
    messagesClone.splice(msgIndex, 1);
    setMessages(messagesClone);
  }, []);

  const markMsgAsRead = useCallback(function (ev, id) {
    ev.stopPropagation();
    const msg = messages.find((item) => item.id === id);
    const msgIndex = messages.indexOf(msg);
    const messagesClone = JSON.parse(JSON.stringify(messages));
    messagesClone[msgIndex].read = !read;
    setMessages(messagesClone);
  }, []);

  return (
    <div
      className={`${styles.message} ${read ? styles.read : styles.unread} ${
        size === "small" ? styles.small : styles.large
      }`}
    >
      <div className={styles["heading-row"]}>
        <h2 className={styles.title}>{subject}</h2>
        <ul>
          <li>
            <button
              class="material-symbols-outlined"
              onClick={(ev) => markMsgAsRead(ev, id)}
            >
              {read ? "check_box" : "check_box_outline_blank"}
            </button>
          </li>
          <li>
            <button
              class="material-symbols-outlined"
              onClick={(ev) => deleteMsg(ev, msg)}
            >
              delete
            </button>
          </li>
        </ul>
      </div>

      <p className={styles.p}>{content}</p>
    </div>
  );
};

export default Message;
