import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getSerializedLexicalEditorState } from '../../../store/slices/interviewSlice';  
import UpdatePlugin from './plugins/UpdatePlugin';
import { EditorThemeClasses } from 'lexical';
import './styles.css';
import { UnderlineNode } from './CustomNode/UnderlineNode';


const Editor: React.FC = () => {
  const serializedLexicalEditorState = useAppSelector(getSerializedLexicalEditorState);

  const theme: EditorThemeClasses = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'p',
    heading: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
    },
    list: {
      ul: 'ul',
      ol: 'ol',
      listitem: 'li',
    },
    quote: 'blockquote',
    text: {
      bold: 'strong',
      italic: 'em',
      strikethrough: 's',
    },
  };

  const initialConfig = {
    namespace: 'InterviewQuestionsEditor',
    theme,
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      UnderlineNode,
    ],
    onError: (err: Error) => console.log(err),
    editable: true,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}> 
      <div className="editor-container ">
        <ToolbarPlugin />
        <div className="editor-content">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="outline-none min-h-full"
              />
            }
            placeholder={<div className="editor-placeholder">Enter your text here...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          {serializedLexicalEditorState && (
            <UpdatePlugin serializedLexicalEditorState={serializedLexicalEditorState} />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
