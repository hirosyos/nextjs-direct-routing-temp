import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.scss";
import Logout from "../components/Logout";
import { UserList } from "../components/UserList";
import { getUserDataList } from "../common/common";

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export const getStaticProps = async ({ params }) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル /index.js");
    console.log("関数 getStaticProps");
    console.log({ params });

    const userDataList = await getUserDataList();

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return {
        //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
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
export default function Home({ userDataList }) {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/index.js");
    console.log("関数 Home");
    console.log({ userDataList });

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to 手記書庫</h1>
                    <Link href="/auth/login">
                        <a>ログイン</a>
                    </Link>
                    <Link href="/auth/signin">
                        <a>サインイン</a>
                    </Link>
                    <Logout />
                    <UserList userDataList={userDataList} />
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
}
