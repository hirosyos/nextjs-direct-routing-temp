import { useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { convertFromTimestampToDatetime } from '@/common/common';

import Logout from '@/components/Logout';
import { UserLoginInfo } from '@/components/User';
import { BooksList } from '@/components/BookList';
import { SectionList } from '@/components/SectionList';

import { AuthContext } from 'pages/_app';
import styles from 'styles/Home.module.scss';
import UserCard from 'components/molecules/UserCard';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

/**
 * ユーザページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookDataList,
 *   sectionDataList,
 * }
 * @return {*}
 */
const UserPageMain = ({
  userName,
  userData,
  bookDataList,
  sectionDataList,
}) => {
  const classes = useStyles();
  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}静的ページ作成中...`);
    return <div>{`${userName}静的ページ作成中...`}</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!userName) {
    //
    // デバッグ情報
    //
    console.log('異常終了 そんなユーザいません\n');
    return <div>そんなユーザいません...</div>;
  }

  if (!userData) {
    //
    // デバッグ情報
    //
    console.log('異常終了 指定されたユーザは存在しません...\n');
    return <div>指定されたユーザは存在しません...</div>;
  }

  //認証情報取得
  const { user } = useContext(AuthContext);
  console.log({ user });

  return (
    <main className={styles.main}>
      <h1>{userName}の手記書庫</h1>
      <BooksList bookDataList={bookDataList} />
      <br />
      <p>{userName}が作成したセクション</p>
      <SectionList sectionDataList={sectionDataList} />
      <br />
      <Link href={`/users/${userName}/bookCreate`}>
        <a>新規手記作成</a>
      </Link>
      <br />
      <Logout />
    </main>
  );
};

export default UserPageMain;
