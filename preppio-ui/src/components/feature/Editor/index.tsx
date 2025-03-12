import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import './styles.css';
// import { useAppSelector } from '../../../hooks/useAppSelector';
// import { getQuestions } from '../../../store/slices/interviewSlice';  

const Editor: React.FC = () => {
  // const questions = useAppSelector(getQuestions);

  const theme = {
    ltr: 'ltr',
    rtl: 'rtl',
    paragraph: 'editor-paragraph',
    root: 'editor-root',
    text: {
      bold: 'font-bold',
      italic: 'italic',
      underline: 'underline',
      strikethrough: 'line-through',
    },
  };

  const initialConfig = {
    namespace: 'InterviewQuestionsEditor',
    theme,
    nodes: [HeadingNode, QuoteNode],
    onError: (err: Error) => console.log(err),
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container">
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
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
