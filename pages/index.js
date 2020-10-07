import TopPageHead from 'components/templates/topPage/TopPageHead';
import TopPageHeader from 'components/templates/topPage/TopPageHeader';
import TopPageFooter from 'components/templates/topPage/TopPageFooter';
import TopPageNavi from 'components/templates/topPage/TopPageNavi';
import TopPageMain from 'components/templates/topPage/TopPageMain';
import { getUserDataList } from 'common/common';
import { RSC } from 'common/resource';

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export const getStaticProps = async ({ params }) => {
  // デバッグ情報
  console.log('\nファイル /pages/index.js');
  console.log('関数 getStaticProps');
  console.log({ params });

  const userDataList = await getUserDataList();

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userDataList: JSON.parse(JSON.stringify(userDataList)),
    },
  };
};

/**
 * サービストップページ
 *
 * @export
 * @return {*}
 */
export default function TopPage({ userDataList }) {
  // デバッグ情報
  console.log('\nファイル /pages/index.js');
  console.log('関数 TopPage');
  console.log({ userDataList });

  return (
    <>
      <TopPageHead pageTitle={RSC.topPageTitle} />
      <TopPageHeader />
      <TopPageNavi />
      <TopPageMain userDataList={userDataList} />
      <TopPageFooter />
    </>
  );
}
