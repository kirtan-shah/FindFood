
const num_inputs = 2;
const gamma = .95;

class Brain {
  constructor() {
    this.nn = tf.sequential();
    this.nn.add(tf.layers.dense({ units: 10, inputShape: [num_inputs], activation: 'relu' })); //hidden layer with size 10
    this.nn.add(tf.layers.dense({ units: 10, activation: 'relu' }));
    this.nn.add(tf.layers.dense({ units: 4, activation: 'relu' }));  //q values
    this.nn.compile({optimizer: 'sgd', lr: .01,  loss: 'meanSquaredError'});
  }

  predict(inputs) {
    const X = tf.tensor2d([inputs], [1, num_inputs]);
    const y = this.nn.predict(X);
    const out = y.dataSync();
    return out;
  }

  learn(game, experiences) {
    let statesM = [];
    let targetM = [];
    for(let i = 0; i < experiences.length; i++) {
      let state = experiences[i][0];
      let Q_sa = experiences[i][1];
      let action = experiences[i][2];
      let reward = experiences[i][3];
      let state_p = experiences[i][4];
      let terminal = experiences[i][5];
      let Q_sap = this.predict(state_p);
      let target = Q_sa.slice(0);
      if(terminal) target[action] = reward; //terminal state
      else target[action] = reward + gamma * maxVal(Q_sap);
      statesM.push(state);
      targetM.push(target);
    }
    let X = tf.tensor2d(statesM, [statesM.length, num_inputs]);
    let y = tf.tensor2d(targetM, [targetM.length, 4]);
    this.nn.fit(X, y).then(() => { game.shouldUpdate = true; });
  }

}
