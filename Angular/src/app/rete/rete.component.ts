import {
  Component, AfterViewInit,
  ViewChild, ElementRef, ViewEncapsulation
} from '@angular/core';

import { NodeEditor, Engine } from 'rete';
import { NumComponent } from './components/number-component';
import { AddComponent } from './components/add-component';
import { Plugin } from 'rete/types/core/plugin';
import ConnectionPlugin from 'rete-connection-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import Stage0RenderPlugin from 'rete-stage0-render-plugin';
import {StringComponent} from "./components/string-component";
import {StrJoinComponent} from "./components/str-join-component";

@Component({
    selector: 'app-rete',
    template: '<div class="wrapper"><div #nodeEditor class="node-editor"></div></div>',
    styleUrls: ['./rete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReteComponent implements AfterViewInit {

  @ViewChild('nodeEditor') el: ElementRef;
  editor = null;

  async ngAfterViewInit() {
    const self = this;

    const container = this.el.nativeElement;

    const components = [new NumComponent(), new AddComponent(),
      new StringComponent(), new StrJoinComponent()];

    const editor = new NodeEditor('demo@0.2.0', container);

    editor.use(ConnectionPlugin as Plugin);
    editor.use(Stage0RenderPlugin as Plugin);
    editor.use(ContextMenuPlugin as Plugin);

    const engine = new Engine('demo@0.2.0');
    components.map(c => {
      editor.register(c);
      engine.register(c);
    });

    const n1 = await components[0].createNode({ num: 2 });
    const n2 = await components[0].createNode({ num: 0 });
    const add = await components[1].createNode();
    const s1 = await components[2].createNode({str : 'jeden'});
    const s2 = await components[2].createNode({str : 'dwa'});
    const strJoin = await components[3].createNode();

    n1.position = [80, 25];
    n2.position = [80, 220];
    add.position = [500, 75];

    s1.position = [80, 500];
    s2.position = [80, 750];
    strJoin.position = [500, 650];

    editor.addNode(n1);
    editor.addNode(n2);
    editor.addNode(add);

    editor.addNode(s1);
    editor.addNode(s2);
    editor.addNode(strJoin);

    editor.connect(n1.outputs.get('num'), add.inputs.get('num1'));
    editor.connect(n2.outputs.get('num'), add.inputs.get('num2'));

    editor.connect(s1.outputs.get('str'), strJoin.inputs.get('str1'));
    editor.connect(s2.outputs.get('str'), strJoin.inputs.get('str2'));

    editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], (async () => {
      await engine.abort();
      await engine.process(editor.toJSON());
    }) as any);

    editor.view.resize();
    editor.trigger('process');
  }
}
