import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";
import BookCreateInputForm from "../../../components/Book";
import { getUserData } from "../../../common/common";

//****************************************************************
//
// 静的パス取得関数
//
// [IN]なし
// [OUT]静的パスを生成するための名称の配列
// [OUT]fallback設定
//
//****************************************************************
export async function getStaticPaths() {
    // const paths = ["/post/1", "/post/2"];
    const paths = [];
    return { paths, fallback: true };
}

//****************************************************************
//
// 静的パラメータ取得関数
//
// [IN]params: { userName: 'パスから切り出された値' }
// [out] ユーザネーム
// [out] ユーザドキュメント
//
//****************************************************************
export async function getStaticProps({ params }) {
    //ユーザ名からユーザデータを取得
    const userData = await getUserData(params.userName);

    // console.log({ params });
    return {
        props: {
            userName: params.userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData.values.data())),
        },
    };
}

//****************************************************************
//
// 手記ページ構成関数コンポーネント
//
// [IN]props.userName ユーザネーム
// [IN]props.userData ユーザデータ
// [OUT] 手記ページ作成ページ全体
//
//****************************************************************
const BookCreate = (props) => {
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to 手記作成 ページ</h1>

                    <p> ユーザー: {props.userName}</p>

                    <BookCreateInputForm userData={props.userData} />

                    <Link href={`/users/${props.userName}`}>
                        <a>ユーザページへ戻る</a>
                    </Link>
                </main>

                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{" "}
                        <img
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.logo}
                        />
                    </a>
                </footer>
            </div>
        </Layout>
    );
};
export default BookCreate;
