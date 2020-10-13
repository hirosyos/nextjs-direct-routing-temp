import { useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Logout from '@/components/Logout';
import { BooksList } from '@/components/BookList';
import { SectionList } from '@/components/SectionList';

import { TabPanel, a11yProps } from '@/components/atoms/TabPanel';

import { AuthContext } from 'pages/_app';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Grid
      container
      alignItems="center"
      justify="center"
      direction="column"
      mt="4rem"
    >
      <Grid item xs={8}>
        {/* ユーザアイコン画像 */}
        <Avatar alt={userName}>{userData.userIconImageUrl}</Avatar>
        <Avatar alt={userName}>{userData.userIconImageUrl}</Avatar>
        <Avatar alt={userName}>{userData.userIconImageUrl}</Avatar>
        {/* ユーザネーム */}
        <Typography variant="h4" align="center">
          {userData.userDisplayName}
        </Typography>
        <Typography variant="subtitle1" align="center">
          {userData.userName}
        </Typography>

        <div className={classes.root}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab label="手記" {...a11yProps(0)} />
              <Tab label="活動" {...a11yProps(1)} />
              <Tab label="未来" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            手記
            <BooksList bookDataList={bookDataList} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {userName}が作成したセクション
            <SectionList sectionDataList={sectionDataList} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            未来
          </TabPanel>
        </div>

        <br />
        <Link href={`/users/${userName}/bookCreate`}>
          <a>新規手記作成</a>
        </Link>
        <br />
        <Logout />
      </Grid>
    </Grid>
  );
};

export default UserPageMain;
