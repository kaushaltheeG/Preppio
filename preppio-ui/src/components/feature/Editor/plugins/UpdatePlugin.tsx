import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React from "react";

const UpdatePlugin = ({ updateFn }: { updateFn: (editor: any) => void }) => {
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    editor.update(() => updateFn(editor));
  }, [editor, updateFn]);

  return null;
};

export default UpdatePlugin;
