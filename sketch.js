
let game;
let brain;
let agents;

function setup() {
  createCanvas(400, 400);
  tf.setBackend('cpu');

  game = new Game();
  brain = new Brain();
  agents = [];
  for(let i = 0; i < 150; i++) {
    agents.push(new Agent());
  }

  setInterval(function () {
    game.update(agents, brain);
  }, 0);

  frameRate(30);
}

function draw() {
  background(255);

  game.draw(brain);

  for(let agent of agents) {
    agent.draw();
  }
}
