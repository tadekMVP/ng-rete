import {Component, ViewChild, ElementRef, ViewEncapsulation, OnInit, Renderer} from '@angular/core';
import {NodeEditor, Engine} from 'rete';
import {NumComponent} from './components/number-component';
import {AddComponent} from './components/add-component';
import {StringComponent} from './components/string-component';
import {StrJoinComponent} from './components/str-join-component';
import {SCHEMA} from './process-schema';
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import {BasicNodeComponent} from './components/basic-node-component';
import {EventsTypes} from 'rete/types/events';

@Component({
  selector: 'app-rete',
  template: '<div class="wrapper" #wrapper><div #nodeEditor class="node-editor"></div></div>',
  styleUrls: ['./rete.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ReteComponent implements OnInit {

  @ViewChild('nodeEditor') el: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;

  editor: NodeEditor;
  engine: Engine;
  components: any[];

  constructor(private renderer: Renderer) {}

  ngOnInit() {
    this.components = [
      new NumComponent(),
      new AddComponent(),
      new StringComponent(),
      new StrJoinComponent(),
      new BasicNodeComponent()
    ];
    this.editor = new NodeEditor(SCHEMA.id, this.el.nativeElement);
    this.engine = new Engine(SCHEMA.id);

    this.editor.use(ConnectionPlugin);
    this.editor.use(VueRenderPlugin);

    this.components.map(c => {
      this.editor.register(c);
      this.engine.register(c);
    });

    // compile on init
    this.editor.on(['process', 'nodecreated', 'noderemoved', 'connectioncreated', 'connectionremoved'] as (keyof EventsTypes)[],  (a) => {
      this.compile();
    });

    // set readonly mode and compile
    // this.editor.on(['renderconnection'] as (keyof EventsTypes)[], () => {
    //   this.renderer.setElementClass(this.wrapper.nativeElement, 'readonly-mode', true);
    //   return this.editor.silent;
    // });

    this.editor.fromJSON(SCHEMA).then(() => {
      this.editor.view.resize();
      this.compile();
    });
  }

  private async compile() {
    await this.engine.abort();
    await this.engine.process(this.editor.toJSON());
  }


}
