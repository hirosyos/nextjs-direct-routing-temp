import {
  getUserDataFromUserName,
  getBookDataFromBookName,
  getAllBookNamePaths,
  getSectionDataListFromBookData,
} from 'common/common';

import { RSC } from 'common/resource';

import BookPageHead from '@templates/BookPage/BookPageHead';
import BookPageHeader from '@templates/BookPage/BookPageHeader';
import BookPageFooter from '@templates/BookPage/BookPageFooter';
import BookPageNavi from '@templates/BookPage/BookPageNavi';
import BookPageMain from '@templates/BookPage/BookPageMain';

/**
 * 静的パス取得
 *
 * @export
 * @return {Array} 静的パスを生成するための名称の配列
 */
export async function getStaticPaths() {
  // デバッグ情報
  console.log('\nファイル /pages/users/[userName]/[bookName].js');
  console.log('関数 getStaticPaths');

  // すべてのユーザ名とブック名を含んだパス生成用配列を取得
  const paths = await getAllBookNamePaths();

  // デバッグ情報
  if (paths) {
    paths.map((p) =>
      console.log(
        `SSG対象ブックページ ${p.params.userName}/${p.params.bookName}`,
      ),
    );
  }

  return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params.userName 'パスから切り出された値'}
 * @param {*} { params.bookName 'パスから切り出された値'}
 * @return {*}
 */
export async function getStaticProps({ params }) {
  // デバッグ情報
  console.log('\nファイル /pages/users/[userName]/[bookName].js');
  console.log('関数 getStaticProps');
  console.log({ params });

  const { userName, bookName } = params;

  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);
  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
  if (!userData) {
    console.log('関数 getStaticProps そんなユーザいません');
    return {
      props: {
        userName,
        userData: null,
        bookName,
        bookData: null,
      },
    };
  }

  // ブック名からブックデータを取得
  const { bookData } = await getBookDataFromBookName(userName, bookName);
  // 該当ブック名のデータが存在しない場合はデータ部をNullで返す
  if (!bookData) {
    console.log('関数 getStaticProps そんなブックありません');
    return {
      props: {
        userName,
        userData,
        bookName,
        bookData: null,
      },
    };
  }

  // ブック配下のセクションデータリストを取得
  const sectionDataList = await getSectionDataListFromBookData(
    userData,
    bookData,
  );
  // セクションが一つでもある場合(なくても異常ではない)
  if (sectionDataList) {
  }

  return {
    // Next.jsはDate型を返してほしくないようなのでJSON変換という暫定処理
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookName,
      bookData: JSON.parse(JSON.stringify(bookData)),
      sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
    },
  };
}
/**
 * 手記ページ
 *
 * @export
 * @param {*} { userName, bookName, bookData }
 * @return {*}
 */
export default function BookNamePage({
  userName,
  userData,
  bookName,
  bookData,
  sectionDataList,
}) {
  // デバッグ情報
  console.log('\nファイル /pages/users/[userName]/[bookName].js');
  console.log('関数 BookNamePage');
  console.log({
    userName,
    userData,
    bookName,
    bookData,
    sectionDataList,
  });

  return (
    <>
      <BookPageHead
        pageTitle={`${RSC.bookPageTitle}/${userName}/${bookName}`}
      />
      <BookPageHeader />
      <BookPageNavi />
      <BookPageMain
        userName={userName}
        userData={userData}
        bookName={bookName}
        bookData={bookData}
        sectionDataList={sectionDataList}
      />

      <BookPageFooter />
    </>
  );
}
