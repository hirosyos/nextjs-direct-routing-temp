import AppHead from 'components/organisms/AppHead';
import AppNavi from 'components/organisms/AppNavi';
import AppFooter from 'components/organisms/AppHead';
/**
 * レイアウト
 * AppHeadでメタ情報定義
 * AppNaviでサイドバーと上部のAppバー定義して、childrenはmainタグに入れます
 * AppFooterは共通降った
 *
 * @param {*} { children, pageTitle, userData }
 * @return {*}
 */
const Layout = ({ children, pageTitle, userData }) => {
  // デバッグ情報
  console.log('\nファイル Layout.js');
  console.log('関数 Layout');

  return (
    <>
      <AppHead pageTitle={pageTitle} />
      <AppNavi appBarTitle={pageTitle} userData={userData}>
        {children}
      </AppNavi>
      <AppFooter />
    </>
  );
};

export default Layout;
