import { useRecoilState } from "recoil";
import { messagesState } from "../store/state.js";

const Message = ({ msg = {} }) => {
  const { subject = "", content = "", read = false } = msg;
  return (
    <div className={`msg ${read ? "read" : "unread"}`}>
      <h2 className="msg--title">{subject}</h2>
      <p className="msg--p">{content}</p>
    </div>
  );
};

export default Message;
