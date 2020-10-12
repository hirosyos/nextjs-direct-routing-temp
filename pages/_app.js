import React, { createContext, useEffect, useState } from 'react';
import Head from 'next/head';
import 'styles/globals.scss';
import firebase from 'common/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import { getUserDataFromUid } from 'common/common';

export const AuthContext = createContext();

/**
 * すべてのページで呼ばれるコンポーネント
 *
 * @param {*} { Component, pageProps }
 * @return {*}
 */
function MyApp({ Component, pageProps }) {
  // デバッグ情報
  console.log('\nファイル /pages/_app.js');
  console.log('関数 UserNamePage');
  console.log({ Component, pageProps });

  const [userData, setUserData] = useState({});

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const [user, loading, error] = useAuthState(firebase.auth());

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const { userData } = await getUserDataFromUid(user.uid);

        console.log('userData');
        console.log(userData);
        setUserData(userData);
      }
      fetchData();
    }
  }, [user]);

  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>
          Error:
          {error}
        </p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <AuthContext.Provider value={{ user, userData }}>
          <Component {...pageProps} />
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
