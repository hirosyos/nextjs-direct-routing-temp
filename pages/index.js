// import TopPageHead from 'components/templates/topPage/TopPageHead';
// import TopPageHeader from 'components/templates/topPage/TopPageHeader';
// import TopPageFooter from 'components/templates/topPage/TopPageFooter';
// import TopPageNavi from 'components/templates/topPage/TopPageNavi';
import TopPageMain from 'components/templates/topPage/TopPageMain';
import { getUserDataList } from 'common/common';
import { RSC } from 'common/resource';
import Layout from 'components/Layout';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export const getStaticProps = async ({ params }) => {
  // デバッグ情報
  console.log('\nファイル /pages/index.js');
  console.log('関数 getStaticProps');
  console.log({ params });

  const userDataList = await getUserDataList();

  return {
    // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
    props: {
      userDataList: JSON.parse(JSON.stringify(userDataList)),
    },
  };
};

/**
 * サービストップページ
 *
 * @export
 * @return {*}
 */
export default function TopPage({ userDataList }) {
  // デバッグ情報
  console.log('\nファイル /pages/index.js');
  console.log('関数 TopPage');
  console.log({ userDataList });

  const classes = useStyles();

  return (
    <Layout pageTitle={RSC.topPageTitle}>
      {/* <TopPageHead pageTitle={RSC.topPageTitle} /> */}
      {/* <TopPageHeader /> */}
      <Grid container justify="center">
        {/* <Grid item xs={2} sm={12}> */}
        {/* <TopPageNavi /> */}
        {/* </Grid> */}
        {/* <Grid item xs={8} sm={12}> */}
        <TopPageMain userDataList={userDataList} />
        {/* </Grid> */}
        {/* <Grid item xs={2} sm={12}></Grid> */}
        {/* <TopPageFooter /> */}
      </Grid>
    </Layout>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
