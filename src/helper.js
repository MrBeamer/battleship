const getRandomShipAxis = () => {
  const randomNumber = Math.floor(Math.random() * 2);
  return randomNumber === 1 ? "X" : "Y";
};

const getRandomCoord = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomField = randomLetter + randomNumber;
  return randomField;
};

export { getRandomShipAxis, getRandomCoord };
