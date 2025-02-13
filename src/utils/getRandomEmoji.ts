const randomEmoji = [
  "😉",
  "🙌",
  "😎",
  "🤞",
  "✌️",
  "👍",
  "☢️",
  "😊",
  "❤️",
  "😀",
  "😁",
  "😶‍🌫️",
  "🤐",
  "🤖",
  "👻",
  "🐮",
  "🦄",
  "🐉",
  "💯",
  "🌐",
];

export const getRandomEmoji = () => {
  const randomNum1 = Math.floor(Math.random() * 10);
  const randowNum2 = Math.floor(Math.random() * 10);
  return randomEmoji[(randomNum1 * randowNum2) % 20];
};
