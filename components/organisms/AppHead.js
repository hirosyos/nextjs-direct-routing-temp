import Head from 'next/head';
import { RSC } from 'common/resource';

const AppHead = ({ pageTitle }) => {
  //
  // デバッグ情報
  //
  console.log('関数 AppHead');
  console.log({ pageTitle });

  return (
    <>
      <Head>
        <title>{`${RSC.catchCopy}/${RSC.appTitle}/${pageTitle}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

export default AppHead;
