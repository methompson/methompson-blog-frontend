import MarkdownIt from 'markdown-it';

export class MarkdownParser {
  constructor(
    protected mdInput: string,
  ) {}

  parseToHTMLString() {
    const md = new MarkdownIt();
    const render = md.render(this.mdInput);

    return render;
  }

  parseToHTML() {
    const render = this.parseToHTMLString();

    const doc = (new DOMParser()).parseFromString(render, 'text/html');

    return doc.body.children;
  }
}