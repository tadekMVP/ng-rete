import {Component, Node} from 'rete';

export class BasicNodeComponent extends Component {
  task;
  constructor() {
    super('Basic');
  }

  builder(node: Node): Promise<any> {
    return Promise.resolve();
  }

  worker(node, inputs, outputs) {
  }

}
