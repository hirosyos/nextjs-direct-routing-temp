import Head from "next/head";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import styles from "../../../../styles/Home.module.scss";

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
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js"
    );
    console.log("関数 getStaticPaths");

    const paths = [];
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
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js"
    );
    console.log("関数 getStaticProps");
    console.log({ params });

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
    //デバッグ情報
    //
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionSetting.js"
    );
    console.log("関数コンポーネント SectionSetting");
    console.log({ props });

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to セクション 設定ページ
                    </h1>
                    <p> ユーザー: {props.userName}</p>
                    <p> 手記: {props.bookName}</p>
                    <Link href={`/users/${props.userName}`}>
                        <a>ユーザページ</a>
                    </Link>
                    <Link href={`/users/${props.userName}/${props.bookName}`}>
                        <a>手記ページ</a>
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
