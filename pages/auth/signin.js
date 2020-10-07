import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import Logout from 'components/Logout';
import Signin from 'components/Signin';
import styles from 'styles/Home.module.scss';
import firebase from 'common/firebase';
import { VALIDUSERS } from 'common/common';
import { AuthContext } from 'pages/_app';

/**
 * サインインページ
 *
 * @export
 * @return {*}
 */
export default function SigninPage() {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/auth/signin.js');
  console.log('関数 SigninPage');

  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState('');

  console.log('user');
  console.log({ user });

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const docSnapshot = await firebase
          .firestore()
          .collection(VALIDUSERS)
          .doc(user.uid)
          .get();

        console.log('docSnapshot');
        console.log(docSnapshot.data());
        setUserName(docSnapshot.data().userName);
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
            <title>手記書庫/サインイン</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to サインイン ページ</h1>
            <h1>認証ページ</h1>
            <Signin />
          </main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>手記書庫/サインイン</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <p>{`すでに${userName}としてログイン済みです`}</p>
        <Link href={`/users/${userName}`}>
          <a>ユーザページへ</a>
        </Link>
        <Logout />
      </div>
    </Layout>
  );
}
