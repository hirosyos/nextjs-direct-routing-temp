import { useState, useRef, useEffect } from 'react';

import firebase from 'common/firebase';

// Firestoreにデータを送信する関数
const postDataToFirestore = async (collectionName, docName, postData) => {
  //
  //デバッグ情報
  //
  console.log('\nファイル Signin.js');
  console.log('関数 postDataToFirestore');
  console.log({ collectionName, docName, postData });

  const addedData = await firebase
    .firestore()
    .collection(collectionName)
    .doc(docName)
    .set(postData);

  //
  //デバッグ情報
  //
  console.log('正常終了\n');

  return addedData;
};

const createUserWithAuthenticationId = async (
  collectionName,
  docName,
  postData,
) => {
  const currentUser = firebase.auth().currentUser;
  await firebase
    .firestore()
    .collection(collectionName)
    .doc(currentUser.uid)
    .set(postData);
  return currentUser;
};

const Signin = () => {
  //
  //デバッグ情報
  //
  console.log('\nファイル Signin.js');
  console.log('関数 Signin');

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [account, setAccount] = useState('');
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, pass);

      const collectionName = 'validUsers';

      const docName = firebase.auth().currentUser.uid;
      // //ユーザデータ書き込み
      const userData = {
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        isPublic: 'false',
        uid: firebase.auth().currentUser.uid,
        userName: account,
        userDisplayName: '',
        userIconImageUrl: '',
        userCoverImageUrl: '',
        userIntroduction: '',
        pricePlan: '',
      };

      await postDataToFirestore(collectionName, docName, userData);
    } catch (e) {
      console.log(e.message, mounted);
      if (mounted.current) setError(e);
    } finally {
      if (mounted.current) setPending(false);
    }
  };
  return (
    <>
      <h2>サインイン</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email..."
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Password..."
        />
        <input
          type="text"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="Account..."
        />
        <button type="submit">Signup</button>
        {pending && 'Pending...'}
        {error && `Error: ${error.message}`}
      </form>
    </>
  );
};

export default Signin;
