import {Component, ViewChild, ElementRef, ViewEncapsulation, OnInit} from '@angular/core';
import {NodeEditor, Engine} from 'rete';
import {NumComponent} from './components/number-component';
import {AddComponent} from './components/add-component';
import {Plugin} from 'rete/types/core/plugin';
import {StringComponent} from "./components/string-component";
import {StrJoinComponent} from "./components/str-join-component";
import {SCHEMA} from './process-schema';
import ConnectionPlugin from 'rete-connection-plugin';
import Stage0RenderPlugin from 'rete-stage0-render-plugin';

@Component({
    selector: 'app-rete',
    template: '<div class="wrapper"><div #nodeEditor class="node-editor"></div></div>',
    styleUrls: ['./rete.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ReteComponent implements OnInit {

  @ViewChild('nodeEditor') el: ElementRef;

  editor: NodeEditor;
  engine: Engine;
  components: any[];

  ngOnInit() {
    this.components = [
      new NumComponent(),
      new AddComponent(),
      new StringComponent(),
      new StrJoinComponent()
    ];
    this.editor = new NodeEditor(SCHEMA.id, this.el.nativeElement);
    this.engine = new Engine(SCHEMA.id);

    this.editor.use(ConnectionPlugin as Plugin);
    this.editor.use(Stage0RenderPlugin as Plugin);

    this.components.map(c => {
      this.editor.register(c);
      this.engine.register(c);
    });

    this.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'], () => {
      if(this.editor.silent) return;
      this.compile();
    });

    this.editor.view.resize();
    this.editor.trigger('process');

    this.editor.fromJSON(SCHEMA).then( () => {
      this.editor.view.resize();
      this.compile();
    });
  }

  private async compile() {
    await this.engine.abort();
    await this.engine.process(this.editor.toJSON());
  }


}
