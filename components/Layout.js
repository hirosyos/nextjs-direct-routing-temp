import Link from 'next/link';
import styles from 'styles/Layout.module.scss';
import AppHead from 'components/organisms/AppHead';
import AppNavi from 'components/organisms/AppNavi';
import AppFooter from 'components/organisms/AppHead';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from 'pages/muidemo/RDr';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Layout = ({ children, pageTitle, userData }) => {
  //
  // デバッグ情報
  //
  console.log('\nファイル Layout.js');
  console.log('関数 Layout');
  // console.log({ props });

  const classes = useStyles();
  // const theme = useTheme();

  return (
    <>
      <AppHead pageTitle={pageTitle} />
      <AppNavi appBarTitle={pageTitle} userData={userData}>
        {/* <ResponsiveDrawer /> */}
        {/* <main className={classes.content}>
          <div className={classes.toolbar}>{children}</div>
        </main> */}
        {children}
      </AppNavi>
      <AppFooter />
    </>
  );
};

export default Layout;
