import { Component, Input, Output } from 'rete';
import {stringSocket} from '../sockets';
import { NumControl } from '../controls/number-control';
import {StringControl} from '../controls/string-control';

export class StrJoinComponent extends Component {
  constructor() {
    super('StrJoin');
  }

  async builder(node) {
    const inp1 = new Input('str1', 'String', stringSocket);
    const inp2 = new Input('str2', 'String', stringSocket);
    const out = new Output('str', 'Joined string', stringSocket);

    inp1.addControl(new StringControl(this.editor, 'str1'));
    inp2.addControl(new StringControl(this.editor, 'str2'));

    node.addInput(inp1)
      .addInput(inp2)
      .addControl(new StringControl(this.editor, 'preview', true))
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    const n1 = inputs['str1'].length ? inputs['str1'][0] : node.data.num1;
    const n2 = inputs['str2'].length ? inputs['str2'][0] : node.data.num2;
    const joinedStr = n1 + ' ' + n2;

    const ctrl = <NumControl> this.editor.nodes.find(n => n.id === node.id).controls.get('preview');
    ctrl.setValue(joinedStr);
    outputs['str'] = joinedStr;
  }
}
