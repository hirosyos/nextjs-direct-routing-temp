import Head from 'next/head';
import Link from 'next/link';
import AppMain from 'components/organisms/AppMain';

import styles from 'styles/Home.module.scss';
import Logout from 'components/Logout';
import { UserList } from 'components/UserList';

import { RSC } from '@/common/resource';
const TopPageMain = ({ userDataList }) => {
  return (
    <>
      <AppMain />

      <div className={styles.container}>
        <main className={styles.main}>
          {/* <h1 className={styles.title}>{RSC.appTitle}</h1> */}
          <Link href="/auth/login">
            <a>{RSC.loginPrint}</a>
          </Link>
          <Link href="/auth/signin">
            <a>{RSC.signinPrint}</a>
          </Link>

          <Logout />

          <UserList userDataList={userDataList} />
        </main>
      </div>
    </>
  );
};

export default TopPageMain;
