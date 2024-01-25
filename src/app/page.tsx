import { createHeadlessEditor } from '@lexical/headless';
import { $generateHtmlFromNodes } from '@lexical/html';
import { JSDOM } from 'jsdom';

function setUpDom() {
  const dom = new JSDOM();

  const _window = global.window;
  const _document = global.document;
  const _documentFragment = global.DocumentFragment;
  const _navigator = global.navigator;

  // @ts-ignore
  global.window = dom.window;
  global.document = dom.window.document;
  global.DocumentFragment = dom.window.DocumentFragment;
  global.navigator = dom.window.navigator;

  return () => {
    // @ts-ignore
    global.window = _window;
    global.document = _document;
    global.DocumentFragment = _documentFragment;
    global.navigator = _navigator;
  };
}

async function getHtml() {
  const html: string = await new Promise((resolve, reject) => {
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
        const cleanUpDom = setUpDom();
        const _html = $generateHtmlFromNodes(editor, null);
        cleanUpDom();
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
