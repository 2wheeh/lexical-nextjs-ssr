'use server';

import { JSDOM } from 'jsdom';
import { $generateHtmlFromNodes } from '@lexical/html';

import createHeadlessEditor from '@/editor/headless';
import prepopulated from '@/lib/prepopulated.json';

export async function getSerializedEditorState() {
  return JSON.stringify(prepopulated.editorState);
}

function setupDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;

  console.log(`typeof document ${typeof document}`); // undefined
  console.log(`typeof window ${typeof window}`); // undefined
  console.log(`typeof global.window ${typeof global.window}`); // undefined

  // @ts-expect-error
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51276
  // https://github.com/capricorn86/happy-dom/issues/1227
  global.window = dom.window;
  global.document = dom.window.document;

  console.log(`typeof document ${typeof document}`); // object
  console.log(`typeof window ${typeof window}`); // this should be object but still undefined
  console.log(`typeof global.window ${typeof global.window}`); // object

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
