import Link from 'next/link';
import styles from 'styles/Layout.module.scss';
import AppNavi from 'components/organisms/AppNavi';

const Layout = (props) => {
  //
  // デバッグ情報
  //
  console.log('\nファイル Layout.js');
  console.log('関数 Layout');
  console.log({ props });

  //
  // デバッグ情報
  //
  console.log('正常終了 Layout\n');

  return (
    <div>
      <header>
        <Link href="/">
          <a className={styles.header}>
            <img
              className={styles.header__img}
              src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
              alt="Next.js ロゴ"
              width="100"
            />
          </a>
        </Link>
      </header>
      {/* <AppNavi /> */}
      <div className={styles.container}>{props.children}</div>
    </div>
  );
};

export default Layout;
