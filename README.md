# 🚀 STARGRID

A retro-inspired space battleship game built with **JavaScript**, **HTML**, and **CSS**. Deploy your fleet, battle an AI-controlled enemy, and conquer the galaxy through strategic ship placement and tactical combat.

Live: https://mrbeamer.github.io/battleship/

---

## 🎮 Features

### Fleet Deployment

* Place 5 unique spacecraft on a 10×10 grid
* Rotate ships horizontally or vertically
* Placement validation to prevent:

  * Overlapping ships
  * Out-of-bounds placement
* Visual placement previews

### Battle System

* Turn-based combat
* Player attacks enemy fleet
* AI-controlled opponent
* Hit and miss tracking
* Ship destruction detection
* Automatic win/loss conditions

### Immersive Experience

* Retro arcade-inspired UI
* Animated typewriter battle dialogue
* Sound effects and background music
* Dynamic narrator messages
* Victory and defeat screens

### Game Controls

* Reset fleet placement
* Restart battles
* Rotate ships before deployment

---

## 🏗️ MVC Architecture

The project is structured using the **Model-View-Controller (MVC)** pattern:

| Layer          | Responsibility                   | Files                     |
| -------------- | -------------------------------- | ------------------------- |
| **Model**      | Stores game state and rules      | `Ship.js`, `Gameboard.js` |
| **View**       | Renders UI and updates the DOM   | `GameView.js`             |
| **Controller** | Handles user input and game flow | `GameController.js`       |
| **Helpers**    | Shared utility functions         | `helper.js`               |

This separation keeps the codebase easier to maintain, test, and extend.

---

## 📁 Project Structure

```text
battleship/
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── sounds/
│   │
│   ├── public/
│   │
│   ├── app.js
│   ├── GameController.js
│   ├── GameView.js
│   ├── Gameboard.js
│   ├── Ship.js
│   ├── helper.js
│   ├── styles.css
│   └── index.html
│
├── tests/
│   ├── gameboard.test.js
│   └── isSink.test.js
│
├── package.json
├── README.md
└── .parcelrc
```

---

## 🔄 Gameplay

1. Insert a coin and start the game.
2. Deploy your fleet of five ships.
3. Rotate ships and position them strategically.
4. Begin battle against the enemy fleet.
5. Alternate turns attacking enemy coordinates.
6. Sink all enemy ships before your fleet is destroyed.
7. Claim victory or prepare for another battle.

---

## 🤖 Enemy AI

The enemy fleet is generated automatically with:

* Random ship placement
* Random ship orientation
* Overlap prevention
* Boundary validation

During battle, the AI selects untargeted coordinates at random and attacks the player's fleet.

---

## 🧪 Testing

Unit tests are located in the `tests/` directory.

### Covered Logic

* Ship hit and sink mechanics
* Gameboard functionality

Run tests:

```bash
npm test
```

---

## 🛠️ Technologies Used

### Frontend

* JavaScript (ES6 Modules)
* HTML5
* CSS3

### Tooling

* Parcel
* Babel
* Jest

### Libraries

* Typewriter Effect

---

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/stargrid.git
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

## 🎯 Future Improvements

* Smarter AI targeting system
* Multiple difficulty levels
* Attack animations and particle effects
* Multiplayer mode
* Mobile responsiveness
* Fleet health indicators
* Save/load functionality

---

## 📚 Learning Objectives

This project was built to practice:

* Object-Oriented Programming (OOP)
* MVC Architecture
* DOM Manipulation
* Event-Driven Programming
* ES6 Modules
* Unit Testing
* State Management
* Game Development Fundamentals

---

## 👨‍💻 Author

Built as part of **The Odin Project JavaScript Curriculum**.

---


