import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes } from '@lexical/html';
import { JSDOM } from 'jsdom';

function setupDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;
  const _documentFragment = global.DocumentFragment;

  console.log(`typeof document ${typeof document}`); // undefined
  console.log(`typeof window ${typeof window}`); // undefined
  console.log(`typeof global.window ${typeof global.window}`); // undefined

  // @ts-expect-error
  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/51276
  // https://github.com/capricorn86/happy-dom/issues/1227
  global.window = dom.window;
  global.document = dom.window.document;
  global.DocumentFragment = dom.window.DocumentFragment;

  console.log(`typeof document ${typeof document}`); // object
  console.log(`typeof window ${typeof window}`); // this should be object but still undefined
  console.log(`typeof global.window ${typeof global.window}`); // object

  return () => {
    global.window = _window;
    global.document = _document;
    global.DocumentFragment = _documentFragment;
  };
}

async function getHtml() {
  const html: string = await new Promise(resolve => {
    const editor = createHeadlessEditor({
      namespace: 'Editor',
      nodes: [],
      onError: () => {},
    });

    editor.setEditorState(
      // "hello world"
      editor.parseEditorState(
        `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"hello world","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`
      )
    );

    editor.update(() => {
      try {
        const cleanupDom = setupDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanupDom();
        resolve(_html);
      } catch (e) {
        console.log(e);
      }
    });
  });

  return html;
}

export default async function Home() {
  const html = await getHtml();
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
