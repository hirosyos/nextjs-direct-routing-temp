import {
  getAllUserNamesPaths,
  getUserDataFromUserName,
  getBookDataListFromUserData,
  getSectionDataListFromUserData,
} from 'common/common';

import { RSC } from 'common/resource';

import UserPageHead from '@/templates/UserPage/UserPageHead';
import UserPageHeader from '@/templates/UserPage/UserPageHeader';
import UserPageFooter from '@/templates/UserPage/UserPageFooter';
import UserPageNavi from '@/templates/UserPage/UserPageNavi';
import UserPageMain from '@/templates/UserPage/UserPageMain';

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export const getStaticPaths = async () => {
  // デバッグ情報
  console.log('\nファイル /pages/users/[userName].js');
  console.log('関数 getStaticPaths');

  // すべてのユーザ名を含んだパス生成用配列を取得
  const paths = await getAllUserNamesPaths();

  // デバッグ情報
  if (paths) {
    paths.map((p) => {
      console.log(`SSG対象ユーザページ ${p.params.userName}`);
    });
  }

  // デバッグ情報
  console.log('正常終了\n');

  return { paths, fallback: true };
};

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
// export async function getStaticProps({ params }) {
export const getStaticProps = async ({ params }) => {
  // デバッグ情報
  console.log('\nファイル /pages/users/userName].js');
  console.log('関数 getStaticProps');
  console.log({ params });

  // パスから切り出された値が入っている
  const { userName } = params;
  // ユーザ名からユーザデータを取得
  const { userData } = await getUserDataFromUserName(userName);

  // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
  if (!userData) {
    // デバッグ情報
    console.log('異常終了 該当ユーザ名のデータが存在しない\n');

    return {
      props: {
        userName,
        userData: null,
      },
    };
  }

  // ユーザデータ配下のブックデータリストを取得
  const bookDataList = await getBookDataListFromUserData(userData);

  // ユーザデータ配下のセクションデータリストを取得
  const sectionDataList = await getSectionDataListFromUserData(userData);

  // デバッグ情報
  console.log('正常終了\n');

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userName,
      userData: JSON.parse(JSON.stringify(userData)),
      bookDataList: JSON.parse(JSON.stringify(bookDataList)),
      sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
    },
  };
};

/**
 * ユーザページ
 *
 * @param {string} userName ユーザネーム
 * @param {object} userData ユーザデータ
 * @return {JSX}
 */
export default function UserNamePage({
  userName,
  userData,
  bookDataList,
  sectionDataList,
}) {
  // デバッグ情報
  console.log('\nファイル /pages/users/[userName].js');
  console.log('関数 UserNamePage');
  console.log({
    userName,
    userData,
    bookDataList,
    sectionDataList,
  });

  return (
    <>
      <UserPageHead pageTitle={`${RSC.userPageTitle}/${userName}`} />
      <UserPageHeader />
      <UserPageNavi />
      <UserPageMain
        userName={userName}
        userData={userData}
        bookDataList={bookDataList}
        sectionDataList={sectionDataList}
      />

      <UserPageFooter />
    </>
  );
}
