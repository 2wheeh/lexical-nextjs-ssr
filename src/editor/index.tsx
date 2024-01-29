'use client';

import { useEffect, useState } from 'react';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { type InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer';
import nodes from './nodes';
import theme from './theme';
import { ChangeModePlugin, CodeHighlightPlugin, HistoryPlugin, MarkdownShortcutPlugin } from './plugins';
import { EditorHistoryContext } from './context';

export default function Editor({ html, serializedEditorState }: { html: string; serializedEditorState: string }) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <>
      {!isMount ? (
        <div className='viewer'>
          <button className='change'>convert to edit mode</button>
          <div dangerouslySetInnerHTML={{ __html: html }}></div>
        </div>
      ) : (
        <InnerEditor serializedEditorState={serializedEditorState} />
      )}
    </>
  );
}

function InnerEditor({ serializedEditorState }: { serializedEditorState: string }) {
  const initialConfig: InitialConfigType = {
    editorState: serializedEditorState,
    nodes: [...nodes],
    namespace: 'csr-editor',
    onError: (error: Error) => {
      throw error;
    },
    theme: theme,
    editable: false,
  };

  return (
    <div className='viewer'>
      <LexicalComposer initialConfig={initialConfig}>
        <EditorHistoryContext>
          <Plugins />
        </EditorHistoryContext>
      </LexicalComposer>
    </div>
  );
}

function Plugins() {
  return (
    <>
      <ChangeModePlugin />
      <RichTextPlugin
        contentEditable={
          <div>
            <ContentEditable />
          </div>
        }
        placeholder={
          <div className='absolute top-[1.125rem] opacity-50 pointer-events-none'>Begin writing your post...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <MarkdownShortcutPlugin />
      <ListPlugin />
      <TabIndentationPlugin />
      <HistoryPlugin />
      <CodeHighlightPlugin />
    </>
  );
}
