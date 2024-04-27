import dynamic from 'next/dynamic';

import { ClientSideEditor_Skeleton } from '@/editor/client-side-editor';
import { getHtml } from '@/lib';

export async function Editor({ serializedEditorState }: { serializedEditorState: string }) {
  const html = await getHtml(serializedEditorState);

  const ClientSideEditor = dynamic(() => import('@/editor/client-side-editor'), {
    ssr: false,
    loading: () => <ClientSideEditor_Skeleton html={html} />,
  });

  return <ClientSideEditor serializedEditorState={serializedEditorState} />;
}
