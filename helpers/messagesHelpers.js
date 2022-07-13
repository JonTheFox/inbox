const fetcher = (...args) => fetch(...args).then((res) => res.json());

const fetchMessages = async (user) => {
  if (!user) {
    throw new Error("Attempted to fetch messages without specifying the user");
  }
  const response = await fetch("/api/messages", {
    method: "POST",
    body: JSON.stringify({ ...user }),
  });
  const messages = await response.json();
  console.log("messages:", messages);
  return messages;
};

const filterMessages = (queryStr = "", messages = []) => {
  const filteredMessages = messages.filter((msg) => {
    const loweredCaseQuery = queryStr?.toLowerCase?.();
    return (
      msg.content?.toLowerCase?.()?.includes(loweredCaseQuery) ||
      msg.title?.toLowerCase?.()?.includes(loweredCaseQuery)
    );
  });
  setFilteredMessages(filteredMessages);
};

export { fetchMessages, filterMessages };
