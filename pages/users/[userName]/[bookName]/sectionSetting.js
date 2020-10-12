import Head from 'next/head';
import Link from 'next/link';
import Layout from 'components/Layout';
import styles from 'styles/Home.module.scss';

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
  //
  // デバッグ情報
  //
  console.log(
    '\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js',
  );
  console.log('関数 getStaticPaths');

  const paths = [];

  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  return { paths, fallback: true };
}
/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export async function getStaticProps({ params }) {
  //
  // デバッグ情報
  //
  console.log(
    '\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js',
  );
  console.log('関数 getStaticProps');
  console.log({ params });

  //
  // デバッグ情報
  //
  console.log('正常終了\n');

  return {
    props: {
      userName: params.userName,
      bookName: params.bookName,
    },
  };
}
/**
 * セクション設定ページ
 *
 * @param {*} props
 * @return {*}
 */
export default function SectionSettingPage(props) {
  //
  // デバッグ情報
  //
  console.log(
    '\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js',
  );
  console.log('関数コンポーネント SectionSetting');
  console.log({ props });

  return (
    <Layout>
      <>
        <h1>Welcome to セクション 設定ページ</h1>
        <p> ユーザー: {props.userName}</p>
        <p> 手記: {props.bookName}</p>
        <Link href={`/users/${props.userName}`}>
          <a>ユーザページ</a>
        </Link>
        <Link href={`/users/${props.userName}/${props.bookName}`}>
          <a>手記ページ</a>
        </Link>
      </>
    </Layout>
  );
}
