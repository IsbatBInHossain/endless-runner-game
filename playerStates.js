const states = {
  SITTING: 0,
  STANDING: 1,
  JUMPING: 2,
};

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Sitting extends State {
  constructor() {
    super('SITTING');
  }
}
