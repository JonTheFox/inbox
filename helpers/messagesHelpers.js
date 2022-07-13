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

export { fetchMessages };
