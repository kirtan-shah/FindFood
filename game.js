
class Game {

    constructor() {
      this.init();
    }

    init() {
      this.foodX = random(width);
      this.foodY = random(height);
      this.pg = createGraphics(width, height);
      for(let x1 = 0; x1 < width; x1++) {
        for(let y1 = 0; y1 < height; y1++) {
          let x = x1 - this.foodX;
          let y = y1 - this.foodY;
          let dist = Math.sqrt(x*x + y*y);
          this.pg.stroke(255, 0, 0, 255 - Math.sqrt(dist)*10);
          this.pg.point(x1, y1);
        }
      }
      this.randThreshold = .9;
      this.randDecay = .9999;
      this.shouldUpdate = true;
    }

    getState(agent) {
      return [agent.x / width, agent.y / height, this.foodX / width, this.foodY / height];
    }

    update(agent, brain) {
      if(!this.shouldUpdate) return;
      let state = this.getState(agent);
      /* selecting action, getting Q_sa */
      let Q_sa = brain.predict(state);
      let action = 0;
      if(random() < this.randThreshold) action = Math.floor(random(4));
      else action = argmax(Q_sa);
      //do action

      let reward = agent.doAction(this, action);
      let state_p = this.getState(agent);
      if(this.shouldUpdate) {
        this.shouldUpdate = false;
        brain.learn(this, state, Q_sa, action, reward, state_p);
      }
      this.randThreshold *= this.randDecay;
    }

    draw() {
      image(this.pg, 0, 0);
    }

}
