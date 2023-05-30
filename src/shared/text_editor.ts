import { Schema, DOMParser } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import {
  schema,
  defaultMarkdownParser,
  defaultMarkdownSerializer,
} from 'prosemirror-markdown';
import { exampleSetup } from 'prosemirror-example-setup';

interface TextEditorInput {
  inputText?: string;
  transactionCallback?: () => void,
};

export class TextEditor {
  protected mySchema: Schema;
  protected state: EditorState;
  protected view?: EditorView = undefined;
  protected transactionCallback: () => void;

  constructor(input: TextEditorInput) {
    // Mix the nodes from prosemirror-schema-list into the basic schema to
    // create a schema with list support.
    this.mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });

    const inputText = input.inputText ?? '';

    const doc = defaultMarkdownParser.parse(inputText) ?? undefined;

    this.state = EditorState.create({
      doc,
      plugins: exampleSetup({ schema: this.mySchema }),
      schema: this.mySchema,
    });

    this.transactionCallback = input.transactionCallback ?? (() => {});
  }

  makeAndInsertEditor(element: Element) {
    const callback = this.transactionCallback;

    const view = new EditorView(element, {
      state: this.state,
      dispatchTransaction(transaction) {
        const state = view.state.apply(transaction);

        view.updateState(state);

        callback();
      },
    });

    this.view = view;
  }

  getMarkdownContent() {
    if (this.view === null || this.view === undefined) {
      throw new Error('Editor View not made');
    }

    return defaultMarkdownSerializer.serialize(this.view?.state.doc);
  }
}