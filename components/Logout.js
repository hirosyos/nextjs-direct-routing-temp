import { useState, useRef, useEffect } from 'react';
import firebase from 'common/firebase';
import Button from '@material-ui/core/Button';

/**
 *
 *
 * @return {*}
 */
const Logout = () => {
  //
  // デバッグ情報
  //
  console.log('\nファイル Logout.js');
  console.log('関数 Logout');

  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    const cleanup = () => {
      mounted.current = false;
    };
    return cleanup;
  }, []);
  const logout = async () => {
    setPending(true);
    await firebase.auth().signOut();
    if (mounted.current) setPending(false);
  };
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="button"
        onClick={logout}
      >
        Logout
      </Button>
      {pending && 'Pending...'}
    </>
  );
};

export default Logout;
