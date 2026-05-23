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

const lookUpShipType = (shipType) => {
  const lookUp = {
    dreadnought: "ship-unit-dreadnought",
    cruiser: "ship-unit-cruiser",
    destroyer: "ship-unit-destroyer",
    frigate: "ship-unit-frigate",
    corvette: "ship-unit-corvette",
  };

  return lookUp[shipType];
};

const playSound = async (soundName) => {
  const soundFiles = {
    "deploy-ship": new URL("./assets/sounds/deploy-ship.mp3", import.meta.url),
    menu: new URL("./assets/sounds/menu.mp3", import.meta.url),
    "hit-ship": new URL("./assets/sounds/hit-ship.mp3", import.meta.url),
    "miss-ship": new URL("./assets/sounds/miss-ship.mp3", import.meta.url),
    "select-ship": new URL("./assets/sounds/select-ship.mp3", import.meta.url),
    "sunk-ship": new URL("./assets/sounds/sunk-ship.mp3", import.meta.url),
    "game-won": new URL("./assets/sounds/game-won.mp3", import.meta.url),
    "game-lost": new URL("./assets/sounds/game-lost.mp3", import.meta.url),
  };
  console.log(soundName);
  const sound = new Audio(soundFiles[soundName]);
  sound.loop = false;
  sound.volume = 1;

  try {
    await sound.play();
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};

export { getRandomShipAxis, getRandomCoord, lookUpShipType, playSound };
