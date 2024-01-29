import type { HistoryState } from '@lexical/react/LexicalHistoryPlugin';
import { createEmptyHistoryState } from '@lexical/react/LexicalHistoryPlugin';
import { ReactNode, createContext, useContext, useMemo } from 'react';

type ContextShape = {
  historyState?: HistoryState;
};

const Context = createContext<ContextShape>({});

export function EditorHistoryContext({ children }: { children: ReactNode }): JSX.Element {
  const historyContext = useMemo(
    () => ({
      historyState: createEmptyHistoryState(),
    }),
    []
  );

  return <Context.Provider value={historyContext}>{children}</Context.Provider>;
}

export function useEditorHistoryContext(): ContextShape {
  return useContext(Context);
}
