import { $isLineBreakNode, type HTMLConfig } from 'lexical';
import { CodeNode } from '@lexical/code';
import { addClassNamesToElement } from '@lexical/utils';

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
        const element = document.createElement('pre');
        addClassNamesToElement(element, editor._config.theme.code);
        element.setAttribute('spellcheck', 'false');
        const language = codeNode.getLanguage();

        if (language) {
          element.setAttribute('data-highlight-language', language);
        }

        const children = codeNode.getChildren();
        const childrenLength = children.length;

        let gutter = '1';
        let count = 1;
        for (let i = 0; i < childrenLength; i++) {
          if ($isLineBreakNode(children[i])) {
            gutter += '\n' + ++count;
          }
        }

        element.setAttribute('data-gutter', gutter);
        return { element };
      },
    ],
  ]),
};
