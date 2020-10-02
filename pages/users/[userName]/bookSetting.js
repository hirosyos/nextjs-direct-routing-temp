import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookSetting.js");
    console.log("関数 getStaticPaths");

    const paths = [];

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

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
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookSetting.js");
    console.log("関数 getStaticProps");
    console.log({ params });

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return {
        props: {
            userName: params.userName,
        },
    };
}
/**
 * 手記設定ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function BookSettingPage(props) {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookSetting.js");
    console.log("関数 BookSettingPage");
    console.log({ props });

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
                    <h1 className={styles.title}>Welcome to 手記設定</h1>

                    <p> ユーザー: {props.userName}</p>

                    <Link href={`/users/${props.userName}`}>
                        <a>ユーザページ</a>
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
}
