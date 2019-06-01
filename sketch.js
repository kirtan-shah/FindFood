
let game;
let agent;
let brain;

function setup() {
  createCanvas(500, 500);
  tf.setBackend('cpu');

  game = new Game();
  agent = new Agent();
  brain = new Brain();

  frameRate(1000);
}

function draw() {
  background(255);

  game.update(agent, brain);

  game.draw();
  agent.draw();
}
