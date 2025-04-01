'use server';

import { parseHTML } from 'linkedom';
import { $generateHtmlFromNodes } from '@lexical/html';

import createHeadlessEditor from '@/editor/headless';
import prepopulated from '@/lib/prepopulated.json';

export async function getSerializedEditorState() {
  return JSON.stringify(prepopulated.editorState);
}

function setupDom() {
  const { window, document } = parseHTML('<html><body></body></html>');
  const _window = global.window;
  const _document = global.document;

  global.window = window;
  global.document = document;

  return () => {
    global.window = _window;
    global.document = _document;
  };
}

function setupWindow() {
  const _window = global.window;
  // need to setup window for CodeNode since facebook#5828
  // https://github.com/facebook/lexical/pull/5828
  // @ts-expect-error
  global.window = global;

  return () => {
    global.window = _window;
  };
}

export async function getHtml(serializedEditorState: string) {
  const html: string = await new Promise(resolve => {
    const cleanup = setupWindow();
    const editor = createHeadlessEditor({ namespace: 'html-renderer' });

    editor.setEditorState(editor.parseEditorState(serializedEditorState));
    cleanup();

    editor.update(() => {
      try {
        const cleanup = setupDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanup();

        resolve(_html);
      } catch (e) {
        console.log(e);
      }
    });
  });

  return html;
}
