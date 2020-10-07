import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Logout from 'components/Logout';
import Login from 'components/Login';
import styles from 'styles/Home.module.scss';
import { getUserDataFromUid, VALIDUSERS } from 'common/common';
import { AuthContext } from 'pages/_app';

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

      // const cleanup = () => {
      //   console.log('cleanup!');
      // };
      // return cleanup;
    }
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className={styles.container}>
          <Head>
            <title>手記書庫/ログイン</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to ログイン ページ</h1>
            <h1>ログインページ</h1>

            <Login />
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>手記書庫/ログイン</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>{`すでに${userName}ログイン済みです`}</p>
        <Link href={`/users/${userName}`}>
          <a>ユーザページへ</a>
        </Link>
        <Logout />
      </div>
    </Layout>
  );
}
