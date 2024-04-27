'use client';

import type { InitialConfigType } from '@lexical/react/LexicalComposer';

import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

import { EditorHistoryContext } from '@/editor/context';
import nodes from '@/editor/nodes';
import {
  ChangeModePlugin,
  ChangeModePlugin_Skeleton,
  CodeHighlightPlugin,
  HistoryPlugin,
  MarkdownShortcutPlugin,
} from '@/editor/plugins';
import theme from '@/editor/theme';

export function ClientSideEditor_Skeleton({ html }: { html: string }) {
  return (
    <div className='viewer'>
      <ChangeModePlugin_Skeleton />
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}

export default function ClientSideEditor({ serializedEditorState }: { serializedEditorState: string }) {
  const initialConfig: InitialConfigType = {
    editorState: serializedEditorState,
    nodes: [...nodes],
    namespace: 'client-editor',
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
        placeholder={<div className='placeholder'>Enter some rich text...</div>}
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
