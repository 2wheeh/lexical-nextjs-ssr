import { useEffect, useState } from 'react';

import { registerCodeHighlighting } from '@lexical/code';
import { TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryPlugin as LexicalHistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';

import { useEditorHistoryContext } from '@/editor/context';

export function MarkdownShortcutPlugin() {
  return <LexicalMarkdownShortcutPlugin transformers={TRANSFORMERS} />;
}

export function HistoryPlugin() {
  const { historyState } = useEditorHistoryContext();
  return <LexicalHistoryPlugin externalHistoryState={historyState} />;
}

export function CodeHighlightPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor);
  }, [editor]);

  return null;
}

export function ChangeModePlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  useEffect(
    () =>
      editor.registerEditableListener(editable => {
        setIsEditable(editable);
      }),
    [editor]
  );

  return (
    <button className='change' onClick={() => editor.setEditable(!editor.isEditable())}>
      {isEditable ? 'convert to read mode' : 'convert to edit mode'}
    </button>
  );
}

export function ChangeModePlugin_Skeleton() {
  return <button className='change'>convert to edit mode</button>;
}
