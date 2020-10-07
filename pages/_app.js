import React, { createContext } from 'react';
import 'styles/globals.scss';
import firebase from 'common/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const AuthContext = createContext();

/**
 * すべてのページで呼ばれるコンポーネント
 *
 * @param {*} { Component, pageProps }
 * @return {*}
 */
function MyApp({ Component, pageProps }) {
  //
  // デバッグ情報
  //
  console.log('\nファイル /pages/_app.js');
  console.log('関数 UserNamePage');
  console.log({ Component, pageProps });

  const [user, loading, error] = useAuthState(firebase.auth());

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

  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  // if (user) {
  return (
    <AuthContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
  // }
}

export default MyApp;
