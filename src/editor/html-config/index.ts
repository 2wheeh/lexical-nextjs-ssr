import type { HTMLConfig } from 'lexical';

import { $isLineBreakNode } from 'lexical';
import { CodeNode } from '@lexical/code';

const generateGutter = (codeNode: CodeNode) => {
  const children = codeNode.getChildren();

  let gutter = '1';
  let count = 1;
  for (let i = 0; i < children.length; i++) {
    if ($isLineBreakNode(children[i])) {
      gutter += '\n' + ++count;
    }
  }

  return gutter;
};

// https://github.com/facebook/lexical/releases/tag/v0.12.3
// referenced an internal function updateCodeGutter in @lexical/code
// to keep 'data-gutter' on exported html.
export const htmlConfig: HTMLConfig = {
  export: new Map([
    [
      CodeNode,
      (editor, node) => {
        // TODO: remove assertion to CodeNode after lexical fixes the type for parameter
        // https://github.com/facebook/lexical/pull/5507
        const codeNode = node as CodeNode;

        const element = codeNode.createDOM(editor._config);

        const gutter = generateGutter(codeNode);
        element.setAttribute('data-gutter', gutter);

        return { element };
      },
    ],
  ]),
};
