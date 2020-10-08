import Link from 'next/link';
import styles from 'styles/Layout.module.scss';

const AppHeader = (props) => {
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
    <header>
      <Link href="/">
        <a className={styles.header}>
          <img
            className={styles.header__img}
            src="/logo.png"
            alt="ShukiShoko ロゴ"
            width="50"
          />
        </a>
      </Link>
    </header>
  );
};

export default AppHeader;
