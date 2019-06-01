
const num_inputs = 4;
const gamma = .9;

class Brain {
  constructor() {
    this.nn = tf.sequential();
    this.nn.add(tf.layers.dense({ units: 10, inputShape: [num_inputs], activation: 'relu' })); //hidden layer with size 10
    this.nn.add(tf.layers.dense({ units: 4, activation: 'linear' }));  //q value, linear
    this.nn.compile({optimizer: 'sgd', lr: .01,  loss: 'meanSquaredError'});
  }

  predict(inputs) {
    const X = tf.tensor2d([inputs], [1, num_inputs]);
    const y = this.nn.predict(X);
    const out = y.dataSync();
    return out;
  }

  learn(game, state, Q_sa, action, reward, state_p) {
    let Q_sap = this.predict(state_p);
    let target = Q_sa.slice(0);
    if(reward < 0) target[action] = reward; //terminal state
    else target[action] = reward + gamma * maxVal(Q_sap);
    let X = tf.tensor2d([state], [1, num_inputs]);
    let y = tf.tensor2d([target], [1, 4]);
    this.nn.fit(X, y).then(() => { game.shouldUpdate = true; });
  }

}
