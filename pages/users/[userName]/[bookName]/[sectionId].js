import {
  getAllSectionIdPaths,
  getSectionDataFromSectionId,
} from 'common/common';

import { RSC } from 'common/resource';

import SectionPageHead from '@templates/SEctionPage/SectionPageHead';
import SectionPageHeader from '@templates/SectionPage/SectionPageHeader';
import SectionPageFooter from '@templates/SectionPage/SectionPageFooter';
import SectionPageNavi from '@templates/SectionPage/SectionPageNavi';
import SectionPageMain from '@templates/SectionPage/SectionPageMain';

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/users/[userName]/[bookName]/[sectionId].js');
  console.log('関数コンポーネント getStaticPaths');

  // すべてのユーザ名とブック名とセクションIDを含んだパス生成用配列を取得
  const paths = await getAllSectionIdPaths();

  //
  // デバッグ情報
  //
  if (paths) {
    paths.map((p) => {
      console.log(
        `SSG対象セクションページ ${p.params.userName}/${p.params.bookName}/${p.params.sectionId}`,
      );
    });
  }
  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export async function getStaticProps({ params }) {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/users/[userName]/[bookName]/[sectionId].js');
  console.log('関数コンポーネント getStaticProps');
  console.log({ params });

  const { userName, bookName, sectionId } = params;

  // セクションIDからセクションデータを取得
  const { sectionData } = await getSectionDataFromSectionId(
    userName,
    bookName,
    sectionId,
  );
  // 該当セクションIDのデータが存在しない場合はデータ部をNullで返す
  if (!sectionData) {
    console.log('そんなセクションはありません\n');
    return {
      props: {
        userName,
        bookName,
        sectionId,
        sectionData: null,
      },
    };
  }

  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  return {
    props: {
      userName,
      bookName,
      sectionId,
      // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
      sectionData: JSON.parse(JSON.stringify(sectionData)),
    },
  };
}

/**
 * セクションIDからページを作成する
 *
 * @export
 * @param {*} {
 *     userName,
 *     bookName,
 *     sectionId,
 *     sectionData,
 * }
 * @return {*}
 */
export default function SectionIdPage({
  userName,
  bookName,
  sectionId,
  sectionData,
}) {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/users/[userName]/[bookName]/[sectionId].js');
  console.log('関数コンポーネント SectionIdPage');
  console.log({
    userName,
    bookName,
    sectionId,
    sectionData,
  });

  return (
    <>
      <SectionPageHead
        pageTitle={`${RSC.userPageTitle}/${userName}/${bookName}/${sectionData.title}`}
      />
      <SectionPageHeader />
      <SectionPageNavi />
      <SectionPageMain
        userName={userName}
        bookName={bookName}
        sectionId={sectionId}
        sectionData={sectionData}
      />
      <SectionPageFooter />
    </>
  );
}
