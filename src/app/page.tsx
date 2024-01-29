import Editor from '@/editor';
import { getHtml, getSerializedEditorState } from '@/lib';

export default async function Home() {
  const serializedEditorState = await getSerializedEditorState(); // fetch editorState from your remote repository
  const html = await getHtml(serializedEditorState);

  return (
    <div className='container mx-auto'>
      <Editor html={html} serializedEditorState={serializedEditorState} />
    </div>
  );
}
