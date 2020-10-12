import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Logout from 'components/Logout';
import Login from 'components/Login';
import styles from 'styles/Home.module.scss';
import { getUserDataFromUid, VALIDUSERS } from 'common/common';
import { AuthContext } from 'pages/_app';
import AppHead from 'components/organisms/AppHead';
import { useRouter } from 'next/router';

/**
 * ログインページ
 *
 * @return {*}
 */
export default function LoginPage() {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/auth/login.js');
  console.log('関数 LoginPage');

  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [userName, setUserName] = useState('');

  console.log('user');
  console.log({ user });

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const { userData } = await getUserDataFromUid(user.uid);

        console.log('userData');
        console.log(userData);
        setUserName(userData.userName);
      }
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (userName) {
      console.log('userName');
      console.log(userName);
      router.push(`/users/${userName}`);
    }
  }, [userName]);

  if (!user) {
    return (
      <Layout>
        <div classNamze={styles.container}>
          <AppHead pageTitle={'ログイン'} />

          <main className={styles.main}>
            <Login />
          </main>
        </div>
      </Layout>
    );
  }

  // else {
  //   router.push(`/users/${userName}`);
  // }

  return (
    <Layout>
      <div className={styles.container}>
        <AppHead pageTitle={'ログイン'} />
        <p>{`すでに${userName}ログイン済みです`}</p>
        <Link href={`/users/${userName}`}>
          <a>ユーザページへ</a>
        </Link>

        <Logout />
      </div>
    </Layout>
  );
}
