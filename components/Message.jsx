import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import { messagesState, selectedMessageState } from "../store/state.js";
import styles from "../styles/Messages.module.scss";

const Message = ({ msg = {}, size = "small", onDelete }) => {
  const { subject = "", content = "", read = false, id } = msg;
  const [messages, setMessages] = useRecoilState(messagesState);
  const [selectedMessage, setSelectedMessage] =
    useRecoilState(selectedMessageState);

  const deleteMsg = useCallback(
    (ev, msg) => {
      ev.stopPropagation();
      onDelete?.(msg);
    },
    [messages, setMessages]
  );

  const markMsgAsRead = useCallback(
    (ev, id) => {
      ev.stopPropagation();
      const msg = messages.find((item) => item.id === id);
      const msgIndex = messages.indexOf(msg);
      const messagesClone = JSON.parse(JSON.stringify(messages));
      // toggle the message's "read" state
      messagesClone[msgIndex].read = !read;
      setMessages(messagesClone);
    },
    [messages, setMessages]
  );

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
              className="material-symbols-outlined"
              onClick={(ev) => markMsgAsRead(ev, id)}
            >
              {read ? "check_box" : "check_box_outline_blank"}
            </button>
          </li>
          <li>
            <button
              className="material-symbols-outlined"
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
