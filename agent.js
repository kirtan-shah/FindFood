
class Agent {
    constructor() {
      this.init();
    }

    init() {
      this.x = random(width);
      this.y = random(height);
      this.r = 10;
    }

    doAction(game, action) {
      this.justDead = false;
      let step = 3;
      if(action == 0) this.x -= step;
      if(action == 1) this.x += step;
      if(action == 2) this.y -= step;
      if(action == 3) this.y += step;
      let reward = alpha(game.pg.get(Math.trunc(this.x), Math.trunc(this.y))) / 255.0;
      if(this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.init();
        this.justDead = true;
        reward = -10;
      }
      return reward;
    }

    draw() {
      fill(255, 255, 0, 70);
      stroke(0);
      ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}
