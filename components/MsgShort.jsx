import { useRecoilState } from "recoil";
import { messagesState } from "../store/state.js";

const MsgShort = ({ msg = {} }) => {
  const { subject = "", content = "", read = false } = msg;
  return (
    <div className={`msg--short ${read ? "read" : "unread"}`}>
      <h2 className="msg--short---title">{subject}</h2>
      <p className="msg--short---p">{content}</p>
    </div>
  );
};

export default MsgShort;
