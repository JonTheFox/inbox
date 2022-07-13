// TODO: connect to a DB and fetch the data from there

const MOCK_MESSAGES = [
  {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    subject: "Subject 1",
    read: false,
    id: 1,
  },
  { content: "MOCK CONTENT 2", subject: "Subject 2", read: false, id: 2 },
  { content: "MOCK CONTENT 3", subject: "Subject 3", read: false, id: 3 },
  { content: "MOCK CONTENT 4", subject: "Subject 4", read: false, id: 4 },
  { content: "MOCK CONTENT 5", subject: "Subject 5", read: false, id: 5 },
  { content: "MOCK CONTENT 6", subject: "Subject 6", read: false, id: 6 },
];

export default function handler(req, res) {
  console.log("req.body: ", req.body);
  const { email, password } = req.body;
  // TODO: authenticate user
  res.status(200).json(MOCK_MESSAGES);
}
