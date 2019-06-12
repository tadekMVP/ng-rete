import { Component, Input} from 'rete';
import { numSocket } from '../sockets';
import { NumControl } from '../controls/number-control';

export class AddComponent extends Component {

  constructor() {
    super('Add');
  }

  async builder(node) {
    const inp1 = new Input('num1', 'Number', numSocket);
    const inp2 = new Input('num2', 'Number', numSocket);
    node.addInput(inp1).addInput(inp2)
      .addControl(new NumControl(this.editor, 'preview', true));
    return node;
  }

  worker(node, inputs, outputs) {
    const n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
    const n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
    const sum = n1 + n2;
    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get('preview')
      .setValue(sum);
    outputs['num'] = sum;
  }
}
