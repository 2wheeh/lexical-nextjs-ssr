import { Editor } from '@/editor';
import { getSerializedEditorState } from '@/lib';

export default async function Home() {
  // get editorState from db
  const serializedEditorState = await getSerializedEditorState();

  return (
    <div className='container mx-auto'>
      <Editor serializedEditorState={serializedEditorState} />
    </div>
  );
}
