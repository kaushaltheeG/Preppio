import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import { ISerializedEditorState } from '../../../../services/interview/api';
import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
export interface UpdatePluginProps {
  serializedLexicalEditorState: ISerializedEditorState;
}

export default function UpdatePlugin({ serializedLexicalEditorState }: UpdatePluginProps): null {
  const [editor] = useLexicalComposerContext();
  console.log(JSON.stringify(serializedLexicalEditorState));
  useEffect(() => {
    editor.update(() => {
      const root = $getRoot();
      
      // Clear existing content
      root.clear();

      // Recreate nodes using Lexical's node creation API
      serializedLexicalEditorState.root.children.forEach((paragraph) => {
        const paragraphNode = $createParagraphNode();
        paragraph.children.forEach((child) => {
          paragraphNode.append($createTextNode(child.text));
        });
        root.append(paragraphNode);
      });
    });
  }, [editor, serializedLexicalEditorState]);

  return null;
};
