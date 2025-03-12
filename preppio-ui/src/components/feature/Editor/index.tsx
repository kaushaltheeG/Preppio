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
// import { $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
// import { IQuestion } from '@/services/interview/api';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getSerializedLexicalEditorState } from '../../../store/slices/interviewSlice';  
import UpdatePlugin from './plugins/UpdatePlugin';

const Editor: React.FC = () => {
  // const questionsData = useAppSelector(getQuestions);
  const serializedLexicalEditorState = useAppSelector(getSerializedLexicalEditorState);
  console.log(serializedLexicalEditorState);
  // const formatQuestionsContent = React.useCallback((questions: IQuestion[]) => {
  //   if (!questions.length) return () => {};
  
  //   return (editor: any) => {
  //     const root = $getRoot();
  //     const paragraphNode = $createParagraphNode();
      
  //     // Add interview details
  //     paragraphNode.append(
  //       // $createTextNode(`Interview Type: ${data.interviewType}\n`),
  //       // $createTextNode(`Interviewer Position: ${data.interviewerPosition}\n\n`),
  //       $createTextNode('Questions:\n\n')
  //     );
  //     root.append(paragraphNode);

  //     // Add questions
  //     questions.forEach((q, index) => {
  //       const questionNode = $createParagraphNode();
  //       questionNode.append(
  //         $createTextNode(`${index + 1}. ${q.question}\n`),
  //         $createTextNode(`Type: ${q.type}\n`),
  //         $createTextNode(`Difficulty: ${q.difficulty}\n`),
  //         $createTextNode(`Topic: ${q.topic}\n`),
  //         $createTextNode('Key Points:\n'),
  //         $createTextNode(`${q.keyPoints.map(point => `• ${point}`).join('\n')}\n\n`)
  //       );
  //       root.append(questionNode);
  //     });
  //   };
  // }, []);

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
    editable: true,
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
          {serializedLexicalEditorState && (
            <UpdatePlugin serializedLexicalEditorState={serializedLexicalEditorState} />
          )}
        </div>
      </div>
    </LexicalComposer>
  );
};

export default Editor;
