import { getHtml } from '@/lib';

export default async function Home() {
  const html = await getHtml();

  return (
    <div className='container mx-auto'>
      <div className='viewer' dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
