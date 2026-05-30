const getRandomShipAxis = () => {
  const randomNumber = Math.floor(Math.random() * 2);
  return randomNumber === 1 ? "X" : "Y";
};

const getRandomNumber = (arrLength) => {
  return Math.floor(Math.random() * arrLength);
};

const getRandomCoord = () => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
  const randomLetter = letters[Math.floor(Math.random() * letters.length)];
  const randomField = randomLetter + randomNumber;
  return randomField;
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
    "insert-coin": new URL("./assets/sounds/insert-coin.mp3", import.meta.url),
    "title-screen": new URL(
      "./assets/sounds/title-screen.mp3",
      import.meta.url,
    ),
  };
  const sound = new Audio(soundFiles[soundName]);
  sound.loop = false;
  sound.volume = 1;

  try {
    await sound.play();
  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};

const villainTaunts = {
  hit: [
    "Your ship is falling apart already!",
    "Pathetic! You never stood a chance!",
    "Direct hit! Feel my wrath!",
    "Your fleet will burn in space!",
    "Another ship bites the dust!",
    "You cannot escape my power!",
    "I will crush your pathetic army!",
    "Your defenses are useless to me!",
    "Muahaha! Your doom has arrived!",
    "I strike fear across the galaxy!",
    "That explosion was beautiful!",
    "Soon all your ships will fall!",
    "You fight like a weakling!",
    "Your end is inevitable!",
    "Feel the fury of my cannons!",
    "One blast closer to your defeat!",
    "Your ship belongs in scrap now!",
    "I enjoy watching you suffer!",
    "The stars themselves fear me!",
    "Another perfect shot by me!",
  ],

  miss: [
    "Hmph! You got lucky this time!",
    "You cannot dodge forever!",
    "Stand still and face destruction!",
    "Next shot will finish you!",
    "Running only delays your doom!",
    "My aim never fails twice!",
    "You are merely postponing defeat!",
    "Enjoy your final moments!",
    "You escaped by pure luck!",
    "Soon your ship will explode!",
    "You cannot hide in space forever!",
    "Your fear makes you predictable!",
    "I will hunt you relentlessly!",
    "The next blast will hit true!",
    "You are nothing before my power!",
    "Even the stars betray you!",
    "Your survival is temporary!",
    "I grow tired of missing!",
    "You will regret resisting me!",
    "No ship escapes my wrath!",
  ],
};

const antiHeroTaunts = {
  hit: [
    "Should’ve stayed out of my way!",
    "That ship won’t fly much longer!",
    "You picked the wrong fight today!",
    "I warned you not to test me!",
    "Another clean shot. Move on.",
    "Your shields are falling fast!",
    "I do what needs to be done!",
    "That had to hurt a little!",
    "You’re losing this battle badly!",
    "I’ve taken down worse than you!",
    "Try harder if you want to live!",
    "That’s what happens when you hesitate!",
    "You’re not escaping this fight!",
    "One more hit should finish you!",
    "Your fleet is breaking apart!",
    "I never miss for long!",
    "You’re making this too easy!",
    "This galaxy has no heroes left!",
    "Looks like your luck ran out!",
    "You should’ve turned back earlier!",
  ],

  miss: [
    "Lucky dodge. Don’t expect another!",
    "Keep moving while you still can!",
    "You almost got hit that time!",
    "I’ll adjust my aim next shot!",
    "You’re surviving on borrowed time!",
    "That was closer than you think!",
    "Don’t get confident yet!",
    "You can’t avoid me forever!",
    "Next blast will land clean!",
    "You’re delaying the inevitable!",
    "I’ve got plenty more shots!",
    "Running won’t save your ship!",
    "You’re tougher than expected!",
    "I’m just getting started here!",
    "That escape won’t happen twice!",
    "Your luck’s about to end!",
    "Fine. Let’s try that again!",
    "You’re forcing me to focus now!",
    "Not bad, but you’re still losing!",
    "Enjoy the calm before the hit!",
  ],
};

const lookUpShipImg = (shipType) => {
  const lookUp = {
    dreadnought: new URL("./public/dreadnought-spaceship.png", import.meta.url)
      .href,
    cruiser: new URL("./public/cruiser-spaceship.png", import.meta.url).href,
    destroyer: new URL("./public/destroyer-spaceship.png", import.meta.url)
      .href,
    frigate: new URL("./public/frigate-spaceship.png", import.meta.url).href,
    corvette: new URL("./public/corvette-spaceship.png", import.meta.url).href,
  };

  return lookUp[shipType];
};

export {
  getRandomShipAxis,
  getRandomCoord,
  playSound,
  antiHeroTaunts,
  villainTaunts,
  getRandomNumber,
  lookUpShipImg,
};
