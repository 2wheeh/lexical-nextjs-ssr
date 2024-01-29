import nodes from './nodes';
import theme from './theme';
import { htmlConfig } from './html-config';
import { createHeadlessEditor as _createHeadlessEditor } from '@lexical/headless';

const createHeadlessEditor = () => {
  return _createHeadlessEditor({
    namespace: 'ssr-editor',
    nodes: [...nodes],
    theme: theme,
    onError: () => {},
    html: htmlConfig,
  });
};

export default createHeadlessEditor;
