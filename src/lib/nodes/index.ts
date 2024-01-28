import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';

import { LinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';

const nodes: (Klass<LexicalNode> | LexicalNodeReplacement)[] = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  CodeNode,
  CodeHighlightNode,
];

export default nodes;
