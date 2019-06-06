import {Component, Node, Output} from 'rete';
import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class NumComponent extends Component {

  constructor() {
    super('Number');
  }

  builder(node: Node): Promise<any> {
    console.log('number builder');
    const out1 = new Output('num', 'Number', numSocket);

    return Promise.resolve(node.addControl(new NumControl(this.editor, 'num')).addOutput(out1));
  }

  worker(node, inputs, outputs) {
    console.log(node.data.num, 'number worker');
    outputs['num'] = node.data.num;
  }

}
