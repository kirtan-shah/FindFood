
class Game {

    constructor() {
      this.init();
      this.arrows = [loadImage('0.png'), loadImage('1.png'), loadImage('2.png'), loadImage('3.png')];
      this.randThreshold = .9;
      this.randDecay = .9999;
      this.shouldUpdate = true;
      this.counter = 0;
    }

    init() {
      this.foodX = random(width);
      this.foodY = random(height);
      this.pg = createGraphics(width, height);
      for(let x1 = 0; x1 < width; x1++) {
        for(let y1 = 0; y1 < height; y1++) {
          let x = x1 - this.foodX;
          let y = y1 - this.foodY;
          let distSq = x*x + y*y;
          let c = distSq > 10000 ? 0 : 255 - Math.pow(distSq, .6);
          this.pg.stroke(255, 0, 0, c);
          this.pg.point(x1, y1);
        }
      }
    }

    getState(agent) {
      return [(agent.x - this.foodX) / width, (agent.y - this.foodY) / height];//[agent.x / width, agent.y / height, this.foodX / width, this.foodY / height];
    }

    update(agents, brain) {
      if(!this.shouldUpdate) return;
      let experiences = [];
      for(let agent of agents) {
        let state = this.getState(agent);
        /* selecting action, getting Q_sa */
        let Q_sa = brain.predict(state);
        let action = 0;
        if(random() < this.randThreshold) action = Math.floor(random(4));
        else action = argmax(Q_sa);
        //do action
        let reward = agent.doAction(this, action);
        let state_p = this.getState(agent);
        let terminal = agent.justDead;
        experiences.push([state, Q_sa, action, reward, state_p, terminal]);
      }
      this.shouldUpdate = false; //should be true
      brain.learn(this, experiences);
      this.randThreshold *= this.randDecay;
      this.counter++;
      if(this.counter == 50) {
        this.counter = 0;
        for(let agent of agents) agent.init();
        this.init();
      }
    }

    draw(brain) {
      imageMode(CORNER);
      image(this.pg, 0, 0);
      imageMode(CENTER);
      for(let x = 0; x < width; x += 20) {
        for(let y = 0; y < height; y += 20) {
          let a = new Agent();
          a.x = x;
          a.y = y;
          let state = game.getState(a);
          let Qs = brain.predict(state);
          let action = argmax(Qs);
          let w, h;
          let ratio = this.arrows[action].height / this.arrows[action].width;
          if(action == 0 || action == 1) {
            h = 5;
            w = h / ratio / 1.5;
          }
          else {
            w = 5;
            h = w * ratio / 1.5;
          }
          image(this.arrows[action], x, y, w, h);
        }
      }
    }

}
