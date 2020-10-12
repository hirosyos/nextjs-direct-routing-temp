import Link from 'next/link';
import styles from 'styles/Layout.module.scss';
import AppHead from 'components/organisms/AppHead';
import AppNavi from 'components/organisms/AppNavi';
import AppFooter from 'components/organisms/AppHead';

const Layout = ({ children, pageTitle, userData }) => {
  //
  // デバッグ情報
  //
  console.log('\nファイル Layout.js');
  console.log('関数 Layout');
  // console.log({ props });

  //
  // デバッグ情報
  //
  console.log('正常終了 Layout\n');

  return (
    <div>
      <AppHead pageTitle={pageTitle} />
      <AppNavi appBarTitle={pageTitle} userData={userData} />
      <div>{children}</div>
      <AppFooter />
    </div>
  );
};

export default Layout;
