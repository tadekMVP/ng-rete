import { Injectable } from '@angular/core';
import {NodeEditor} from 'rete';
import {Data} from 'rete/types/core/data';

@Injectable({
  providedIn: 'root'
})
export class NodeEditorService {

  setSchema(editor: NodeEditor, schema: Data) {
    console.log(editor, schema);
  }
}
