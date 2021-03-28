/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images.
*/

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.getElementById("canvas").appendChild(canvas);

let bg = {}; // background

/**
 * Setting up our characters.
 *
 * Note that hero.x represents the X position of our hero.
 * hero.y represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * The same goes for the monsters
 *
 */

let hero = { x: canvas.width / 2, y: canvas.height / 2, size: 35 }; //hero position//

let monsters = [
  { x: 100, y: 100 }, // mon posi
  { x: 200, y: 200 },
  { x: 300, y: 300 },
];

let startTime = Date.now();
const SECONDS_PER_ROUND = 30; /// limited second per round
let elapsedTime = 0; // keep track of how long the game run
let keysPressed = {}; ///keep track of waht key is pressing

let score = 0;
// document.getElementById("score").innerHTML = 'this is my score' ${score}; /// bo vo render

/// end of decleration
function loadImages() {
  bg.image = new Image();

  bg.image.onload = function () {
    // show the background image
    bg.ready = true;
  };
  bg.image.src = "images/background.png";
  hero.image = new Image();
  hero.image.onload = function () {
    // show the hero image
    hero.ready = true;
  };
  hero.image.src = "images/hero.png";

  monsters.forEach((monster, i) => {
    monster.image = new Image();
    monster.image.onload = function () {
      // show the monster image
      monster.ready = true;
    };
    monster.image.src = `images/monster_${i + 1}.png`;
  });
}

/**
 * Keyboard Listeners
 * You can safely ignore this part, for now.
 *
 * This is just to let JavaScript know when the user has pressed a key.
 */
// let keysPressed = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here.
  document.addEventListener(
    "keydown",
    function (e) {
      keysPressed[e.key] = true;
    },
    false
  );

  document.addEventListener(
    "keyup",
    function (e) {
      keysPressed[e.key] = false;
    },
    false
  );
}

/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *
 *  If you change the value of 5, the player will move at a different rate.
 */
let update = function () {
  // Update the time.
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (keysPressed["ArrowUp"]) {
    hero.y -= 5; /// smaller distance (it will be change the speed)
  }
  if (keysPressed["ArrowDown"]) {
    hero.y += 5; //bigger distance
  }
};
if (keysPressed["ArrowLeft"]) {
  hero.x -= 5;
}
if (keysPressed["ArrowRight"]) {
  hero.x += 5;
}

for (let index = 0; index < monsters.length; index++) {
  let monster = monsters[index];
  if (
    hero.x <= monster.x + hero.size && /// change thanh hero.size from 32
    monster.x <= hero.x + hero.size &&
    hero.y <= monster.y + hero.size &&
    monster.y <= hero.y + hero.size
  ) {
    monster.x = monster.x + 50;
    monster.y = monster.y + 70;
  }
}
// hero top & bottom /// right& left /// else if for purpose that // if first step fail
if (hero.y == canvas.height - 35) {
  hero.y = 0;
} else if (hero.y == 0) {
  hero.y = canvas.height - 35;
}

if (hero.x >= canvas.height - 35) {
  hero.x = 0;
} else if (hero.x == 0) {
  hero.x >= canvas.height - 35;
}
// monsters...
// loop start from 0 but array.lenght start from1.

for (let index = 0; index < monsters.length; index++) {
  const singleMonster = monsters[index];
  if (
    hero.x <= singleMonster.x + hero.size &&
    singleMonster.x <= hero.x + hero.size &&
    hero.y <= singleMonster.y + hero.size &&
    singleMonster.y <= hero.y + hero.size
  )
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    score += 1; /// increcsing the score
  singleMonster.x = singleMonster.x + Math.random() * canvas.width - 35;
  singleMonster.y = singleMonster.y + Math.random() * canvas.height - 35;
}

// Check if player and monster collided. Our images
// are 32 pixels big.
//   monsters.forEach((monster) => {
//     if (
//       hero.x <= monster.x + 32 &&
//       monster.x <= hero.x + 32 &&
//       hero.y <= monster.y + 32 &&
//       monster.y <= hero.y + 32
//     ) {
//       // Pick a new location for the monster.
//       // Note: Change this to place the monster at a new, random location.
//       monster.x = monster.x + 50;
//       monster.y = monster.y + 70;
//     }
//   });
// };

/**
 * This function, render, runs as often as possible.
 */
function render() {
  if (bg.ready) {
    ctx.drawImage(bg.image, 0, 0);
  }
  if (hero.ready) {
    ctx.drawImage(hero.image, hero.x, hero.y);
  }
  monsters.forEach((monster) => {
    if (monster.ready) {
      ctx.drawImage(monster.image, monster.x, monster.y);
    }
  });
  ctx.fillText(
    `Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`,
    20,
    100
  );
}

/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
function main() {
  update();
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers.
  requestAnimationFrame(main); // keep the browser update IF THERE IS ANIMATION
}

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame =
  w.requestAnimationFrame ||
  w.webkitRequestAnimationFrame ||
  w.msRequestAnimationFrame ||
  w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();
