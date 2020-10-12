import Link from 'next/link';
import { useRouter } from 'next/router';

import { convertFromTimestampToDatetime } from '@/common/common';

import AppMain from '@/components/organisms/AppMain';
import { SectionList } from '@/components/SectionList';

import styles from 'styles/Home.module.scss';
import BookCard from 'components/molecules/BookCard';
/**
 * ブックページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookName,
 *   bookData,
 *   sectionDataList,
 * }
 * @return {*}
 */
const BookPageMain = ({
  userName,
  userData,
  bookName,
  bookData,
  sectionDataList,
}) => {
  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}/${bookName}静的ページ作成中...`);
    return <div>{`${userName}/${bookName}静的ページ作成中...`}</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!userName) {
    //
    // デバッグ情報
    //
    console.log('異常終了 そんなユーザいません\n');
    return <div>そんなユーザいません...</div>;
  }

  if (!userData) {
    //
    // デバッグ情報
    //
    console.log('異常終了 指定されたユーザは存在しません...\n');
    return <div>指定されたユーザは存在しません...</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!bookName) {
    //
    // デバッグ情報
    //
    console.log('異常終了 そんな手記はありません\n');

    return <div>そんな手記はありません...</div>;
  }

  if (!bookData) {
    //
    // デバッグ情報
    //
    console.log('異常終了 指定された手記は存在しません...\n');

    return <div>指定された手記は存在しません...</div>;
  }

  return (
    <>
      <AppMain />

      <main className={styles.main}>
        <h1>
          手記
          {bookName}
        </h1>

        <BookCard userName={userName} bookName={bookName} bookData={bookData} />

        <h1>手記{bookName} が持つセクション</h1>
        <SectionList sectionDataList={sectionDataList} />

        <Link href={`/users/${userData.userName}/bookSetting`}>
          <a>手記設定 へ移動</a>
        </Link>
        <br />
        <Link
          href={`/users/${userData.userName}/${bookData.bookName}/sectionCreate`}
        >
          <a>セクション作成 へ移動</a>
        </Link>
      </main>
    </>
  );
};

export default BookPageMain;
