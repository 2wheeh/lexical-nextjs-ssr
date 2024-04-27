import { createHeadlessEditor as _createHeadlessEditor } from '@lexical/headless';

import nodes from '@/editor/nodes';
import theme from '@/editor/theme';
import { htmlConfig } from '@/editor/html-config';

const createHeadlessEditor = ({ namespace }: { namespace?: string }) => {
  return _createHeadlessEditor({
    namespace,
    nodes: [...nodes],
    theme: theme,
    onError: e => {
      console.error(e);
    },
    html: htmlConfig,
  });
};

export default createHeadlessEditor;
