import { useRecoilState } from "recoil";
import { messagesState } from "../store/state.js";
import styles from "../styles/Messages.module.scss";

const Message = ({ msg = {} }) => {
  const { subject = "", content = "", read = false } = msg;
  return (
    <div className={styles[`msg--${read ? "read" : "unread"}`]}>
      <h2 className="msg--title">{subject}</h2>
      <p className="msg--p">{content}</p>
    </div>
  );
};

export default Message;
