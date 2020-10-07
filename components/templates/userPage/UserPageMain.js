import Head from 'next/head';
import Link from 'next/link';
import AppMain from 'components/organisms/AppMain';

import styles from 'styles/Home.module.scss';
import Logout from 'components/Logout';
import { UserList } from 'components/UserList';

const UserPageMain = ({ userDataList }) => {
  return (
    <>
      <AppMain />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Welcome to 手記書庫</h1>
          <Link href="/auth/login">
            <a>ログイン</a>
          </Link>
          <Link href="/auth/signin">
            <a>サインイン</a>
          </Link>

          <Logout />

          <UserList userDataList={userDataList} />
        </main>
      </div>
    </>
  );
};

export default UserPageMain;
