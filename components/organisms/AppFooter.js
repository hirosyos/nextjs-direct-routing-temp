import styles from 'styles/Home.module.scss';
import { RSC } from '@/common/resource';

const AppFooter = (props) => {
  //
  // デバッグ情報
  //
  console.log('関数 AppFooter');
  console.log({ props });

  //
  // デバッグ情報
  //
  console.log('正常終了 Layout\n');

  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by{' '}
        <img
          src={RSC.img.footerImg}
          alt="ShukiShoko Logo"
          className={styles.logo}
        />
      </a>
    </footer>
  );
};

export default AppFooter;
