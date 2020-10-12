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
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>{`${RSC.catchCopy}/${RSC.appTitle}/${pageTitle}`}</title>
        {/* <link rel="icon" href={RSC.img.faviconImg} /> */}
      </Head>
    </>
  );
};

export default AppHead;
