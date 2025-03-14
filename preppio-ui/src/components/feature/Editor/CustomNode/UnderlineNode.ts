import {
  TextNode,
  LexicalEditor,
  DOMExportOutput,
  DOMConversionMap,
  DOMConversionOutput,
  $applyNodeReplacement,
  LexicalNode,
} from 'lexical';

export class UnderlineNode extends TextNode {
  static getType(): string {
    return 'underline';
  }

  static clone(node: UnderlineNode): UnderlineNode {
    return new UnderlineNode(node.__text, node.__key);
  }

  createDOM(): HTMLElement {
    const dom = document.createElement('u');
    dom.textContent = this.__text;
    return dom;
  }

  updateDOM(prevNode: UnderlineNode, dom: HTMLElement): boolean {
    const newText = this.__text;
    if (prevNode.__text !== newText) {
      dom.textContent = newText;
      return true;
    }
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    return { element: this.createDOM() };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      u: () => ({
        conversion: convertUnderlineElement,
        priority: 1,
      }),
    };
  }
}

function convertUnderlineElement(element: HTMLElement): DOMConversionOutput {
  return { node: $createUnderlineNode(element.textContent || '') };
}

export function $createUnderlineNode(text: string): UnderlineNode {
  return $applyNodeReplacement(new UnderlineNode(text));
}

export function $isUnderlineNode(
  node: LexicalNode | null | undefined,
): node is UnderlineNode {
  return node instanceof UnderlineNode;
}
