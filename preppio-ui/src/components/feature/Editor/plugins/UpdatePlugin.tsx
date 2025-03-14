import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { $generateNodesFromDOM } from '@lexical/html';
import { ISerializedEditorState } from '../../../../services/interview/api';
import { $getRoot, $insertNodes } from 'lexical';
export interface UpdatePluginProps {
  serializedLexicalEditorState: ISerializedEditorState;
}


export default function UpdatePlugin({ serializedLexicalEditorState }: UpdatePluginProps): null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();

      // Clear existing content
      root.clear();
      const parser = new DOMParser();

      // Parse the HTML content into a DOM object
      const dom = parser.parseFromString(serializedLexicalEditorState.root.htmlContent, 'text/html');

      // Generate Lexical nodes from the DOM object
      const nodes = $generateNodesFromDOM(editor, dom);
      $insertNodes(nodes);
    });
  }, [editor, serializedLexicalEditorState]);

  return null;
};
