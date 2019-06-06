import {Component, Node, Output} from 'rete';
import { stringSocket } from '../sockets';
import {StringControl} from "../controls/string-control";

export class StringComponent extends Component {

  constructor() {
    super('String');
  }

  builder(node: Node): Promise<any> {
    console.log('string builder');
    const out1 = new Output('str', 'String', stringSocket);

    return Promise.resolve(node.addControl(new StringControl(this.editor, 'str')).addOutput(out1));
  }


  worker(node, inputs, outputs) {
    // console.log(node, inputs, outputs);
    console.log(node.data.str, 'string worker');
    outputs['str'] = node.data.str;
  }

}
